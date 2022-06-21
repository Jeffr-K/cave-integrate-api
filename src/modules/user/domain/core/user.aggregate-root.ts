// import { AggregateRoot } from '@nestjs/cqrs';
// import { IUserOutBoundPort } from '../ports/out/user.out-bound.port';
// import { Username } from './username';
// import { Password } from './password';
// import { Email } from './email';
// import { Address } from './address';
// import { Phone } from './phone';
// import { Id } from './id.base';
// import { User } from '../entities/user.entity';
//
// export class UserModel extends AggregateRoot {
//
//   private id: Id;
//   private username: Username;
//   private password: Password;
//   private email: Email;
//   private address: Address;
//   private phone: Phone;
//
//   constructor(id: string, username: string, ...args) {
//     super();
//     this.id = new Id().assign(id);
//     this.username = new Username().assign();
//     this.password = new Password().assign();
//     this.email = new Email().assign();
//     this.address = new Address().assign();
//     this.phone = new Phone().assign();
//   }
//
//   async register() {
//     const data = new User();
//     await this.userOutBoundPort.insert(data)
//   }
//
//
//   question() {
//     const value = "a";
//     this.autoCommit(true);
//     this.autoCommit();
//     this.publish();
//     this.publishAll()
//     this.commit()
//     this.uncommit()
//     this.getUncommittedEvents()
//     this.loadFromHistory()
//     this.apply()
//     this.getEventHandler()
//     this.getEventName()
//   }
//
// }