import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { typeormConfig } from './externals/config/database/typeorm.config';
import { winstonConfig } from './externals/config/logger/winston.config';

const Modules = [UserModule, AuthModule];
@Module({
  imports: [
    TypeOrmModule.forRoot({ ...typeormConfig }),
    WinstonModule.forRoot({ ...winstonConfig }),
    ...Modules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
