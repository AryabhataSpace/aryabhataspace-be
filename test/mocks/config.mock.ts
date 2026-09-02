import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private values: Record<string, string> = {
    DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/aryabhataspace_db',
    JWT_SECRET: 'mock_jwt_secret',
    JWT_EXPIRES_IN: '7d',
    GMAIL_USER: 'test@gmail.com',
    GMAIL_APP_PASSWORD: 'test_password',
    GMAIL_FROM: '"Aryabhata Space" <no-reply@aryabhataspace.org>',
    APP_URL: 'http://localhost:3000',
  };

  get<T = string>(key: string, defaultValue?: T): T {
    return (this.values[key] as unknown as T) ?? (defaultValue as T);
  }
}

export class ConfigModule {
  static forRoot = jest.fn(() => ({ module: ConfigModule }));
}
