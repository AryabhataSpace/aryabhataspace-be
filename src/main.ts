import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { pathToFileURL } from 'url';
import { Logger } from '@nestjs/common';

// Load .env file if supported by Node runtime
try {
  process.loadEnvFile?.();
} catch {
  // Ignore if .env is missing or already loaded in container environments
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.set('trust proxy', true);

  // Determine path to the Angular SSR bundle.
  // Whether we are in src/ or dist/, `..` brings us to `aryabhataspace-be`.
  const feServerPath = join(__dirname, '../client-dist/server/server.mjs');
  const feServerUrl = pathToFileURL(feServerPath).href;

  // Set NG_ALLOWED_HOSTS for Angular SSR to prevent SSRF errors and fallback to CSR
  // We use '*' by default in this initial development phase to allow custom Railway domains
  if (!process.env['NG_ALLOWED_HOSTS']) {
    process.env['NG_ALLOWED_HOSTS'] = '*';
  }

  let ssrLoadError: string | null = null;
  let angularServerModule: any = null;

  try {
    const nativeImport = new Function('modulePath', 'return import(modulePath)');
    angularServerModule = await nativeImport(feServerUrl);
  } catch (err) {
    ssrLoadError = (err as Error).message;
    logger.warn(`Angular SSR module not found at ${feServerPath}. Ensure the frontend is built and copied. Error: ${ssrLoadError}`);
  }

  expressApp.use('/', (req: any, res: any, next: any) => {
    if (req.url.startsWith('/api')) {
      return next();
    }
    
    if (angularServerModule && angularServerModule.reqHandler) {
      angularServerModule.reqHandler(req, res, next);
    } else {
      res.status(500).send(`
        <h1>Backend API is running.</h1>
        <p>However, the Angular SSR module failed to load or was not found.</p>
        <p><strong>Path checked:</strong> ${feServerPath}</p>
        <p><strong>Error:</strong> ${ssrLoadError || 'reqHandler not exported'}</p>
        <p>Please ensure you have built the frontend and committed the <code>client-dist</code> directory to this repository.</p>
      `);
    }
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
