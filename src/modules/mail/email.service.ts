import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor() {}

  async sendEmail(email: string, token: string) {
    console.log('email verification', email);
    console.log('token verification', token);
    console.log('이메일 이벤트를 받아 전송합니다.');
    return '이메일 입니다';
  }
}
