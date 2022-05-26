import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { AuthModule } from './domain/auth/auth.module';
import { UserModule } from './domain/user/user.module';
import { typeormConfig } from './infrastructure/config/database/typeorm.config';
import { winstonConfig } from './infrastructure/config/logger/winston.config';

const Modules = [UserModule, AuthModule];
@Module({
  imports: [
    TypeOrmModule.forRoot({ ...typeormConfig }),
    WinstonModule.forRoot({ ...winstonConfig }),
    ...Modules
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
