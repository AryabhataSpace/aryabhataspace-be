import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtService {
  sign(payload: any, options?: any): string {
    return 'mock-jwt-token-12345';
  }

  verify(token: string, options?: any): any {
    return {
      sub: 'cand-101',
      email: 'aarav.sharma@iitd.ac.in',
      fullName: 'Aarav Sharma',
      role: 'candidate',
    };
  }

  decode(token: string, options?: any): any {
    return this.verify(token);
  }
}

export class JwtModule {
  static register = jest.fn(() => ({ module: JwtModule }));
  static registerAsync = jest.fn(() => ({ module: JwtModule }));
}
