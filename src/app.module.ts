import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { typeormConfig } from './infrastructure/config/database/typeorm.config';
import { winstonConfig } from './infrastructure/config/logger/winston.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...typeormConfig }),
    WinstonModule.forRoot({ ...winstonConfig })
  ]
})
export class AppModule {}
