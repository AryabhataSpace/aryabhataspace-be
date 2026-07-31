import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { pathToFileURL } from 'url';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  const expressApp = app.getHttpAdapter().getInstance();

  // Determine path to the Angular SSR bundle.
  // Whether we are in src/ or dist/, `..` brings us to `aryabhataspace-be`.
  const feServerPath = join(__dirname, '../client-dist/server/server.mjs');
  const feServerUrl = pathToFileURL(feServerPath).href;

  // Set ALLOWED_HOSTS for Angular SSR to prevent SSRF errors and fallback to CSR
  let allowedHosts = 'localhost,127.0.0.1,localhost:3000';
  if (process.env.RAILWAY_PUBLIC_DOMAIN) {
    allowedHosts += `,${process.env.RAILWAY_PUBLIC_DOMAIN}`;
  }
  
  if (!process.env['ALLOWED_HOSTS']) {
    process.env['ALLOWED_HOSTS'] = allowedHosts;
  } else if (process.env.RAILWAY_PUBLIC_DOMAIN) {
    process.env['ALLOWED_HOSTS'] += `,${process.env.RAILWAY_PUBLIC_DOMAIN}`;
  }

  try {
    const nativeImport = new Function('modulePath', 'return import(modulePath)');
    const angularServerModule = await nativeImport(feServerUrl);
    
    if (angularServerModule.reqHandler) {
      expressApp.use('/', (req: any, res: any, next: any) => {
        if (req.url.startsWith('/api')) {
          return next();
        }
        angularServerModule.reqHandler(req, res, next);
      });
      logger.log(`Angular SSR engine loaded and mounted from ${feServerPath}`);
    }
  } catch (err) {
    logger.warn(`Angular SSR module not found at ${feServerPath}. Ensure the frontend is built and copied. Error: ${(err as Error).message}`);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
