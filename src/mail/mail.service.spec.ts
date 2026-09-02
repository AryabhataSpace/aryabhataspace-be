const mockSendMail = jest.fn().mockResolvedValue({ messageId: 'msg-123' });

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  }),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';

describe('MailService', () => {
  let service: MailService;

  beforeEach(async () => {
    mockSendMail.mockClear();

    const configService = {
      get: jest.fn((key: string, defaultValue?: any) => {
        const map: Record<string, any> = {
          GMAIL_USER: 'test-user@gmail.com',
          GMAIL_APP_PASSWORD: 'real_mock_pass_123',
          GMAIL_FROM: '"Aryabhata Space" <no-reply@aryabhataspace.org>',
          APP_URL: 'http://localhost:3000',
        };
        return map[key] ?? defaultValue;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: ConfigService,
          useValue: configService,
        },
      ],
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should dispatch verification email with token link', async () => {
    const result = await service.sendVerificationEmail(
      'cadet@example.com',
      'Cadet Sharma',
      'mock-verify-token-123',
    );
    expect(result).toBe(true);
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'cadet@example.com',
        subject: 'Verify Your Aryabhata Space Candidate Account',
      }),
    );
  });

  it('should dispatch password reset email with reset link', async () => {
    const result = await service.sendPasswordResetEmail(
      'cadet@example.com',
      'Cadet Sharma',
      'mock-reset-token-456',
    );
    expect(result).toBe(true);
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'cadet@example.com',
        subject: 'Reset Your Aryabhata Space Password',
      }),
    );
  });

  it('should dispatch password changed security alert', async () => {
    const result = await service.sendPasswordChangedAlert(
      'cadet@example.com',
      'Cadet Sharma',
    );
    expect(result).toBe(true);
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'cadet@example.com',
        subject: 'Security Alert: Aryabhata Space Password Changed',
      }),
    );
  });
});
