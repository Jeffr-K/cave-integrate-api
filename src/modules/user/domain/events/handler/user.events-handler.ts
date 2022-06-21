import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../event/user-created.event';
import { EmailService } from '../../../../mail/email.service';

// command handler 가 이벤트를 발생하고 publish 하면, 이벤트의 내용을 처리해야하므로 이 핸들러가 처리를 함.

@EventsHandler(UserCreatedEvent)
export class UserEventsHandler implements IEventHandler<UserCreatedEvent> {
  constructor(private emailService: EmailService) {}
  // command 핸들러가 Publish 메소드로 보낸 이메일을 여기서 처리함.
  async handle(event: UserCreatedEvent) {
    const { email, token } = event;
    await this.emailService.sendEmail(email, token); // 이벤트를 받아서 핸들링할 때 mail 모듈의 메일 서비스를 이용함. 이메일과 토큰 정보를 넣어서 처리를 위임함.
  }
}