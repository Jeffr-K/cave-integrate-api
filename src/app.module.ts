import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { typeormConfig } from './infrastructure/config/database/typeorm.config';
import { winstonConfig } from './infrastructure/config/logger/winston.config';
import { EventEmitterModule } from '@nestjs/event-emitter';

const Modules = [UserModule, AuthModule];
@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({ ...typeormConfig }),
    WinstonModule.forRoot({ ...winstonConfig }),
    ...Modules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
