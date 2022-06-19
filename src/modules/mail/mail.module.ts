import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
  imports: [],
  exports: [EmailService],
  controllers: [],
  providers: [EmailService],
})
export class MailModule {}
