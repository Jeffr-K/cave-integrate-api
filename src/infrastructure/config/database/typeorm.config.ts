import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
config();

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_ROOT_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  logging: true,
  extra: { ssl: { rejectUnauthorized: false } },
  entities: ['dist/**/*.entity.js'],
  autoLoadEntities: true,
  migrations: ['migration/*.js'],
  subscribers: ['src/subscriber/**/*.ts'],
};
