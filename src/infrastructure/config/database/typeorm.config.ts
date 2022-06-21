import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
config();

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: true,
  extra: { ssl: { rejectUnauthorized: false } },
  entities: ['dist/**/*.entity.js'],
  autoLoadEntities: true,
  migrations: ['migration/*.js'],
  subscribers: ['src/subscriber/**/*.ts'],
};
