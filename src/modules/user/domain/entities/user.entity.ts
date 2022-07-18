import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, Generated, JoinColumn, OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import { Address } from './address.entity';
import { Token } from '../../../auth/entities/token.entity';

@Entity()
export class User extends AggregateRoot {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ length: 20, nullable: false })
  username: string;

  @Column({ length: 100, nullable: false })
  password: string;

  @Column({ length: 100, nullable: false, unique: true})
  email: string;

  @Column({ length: 100, nullable: false })
  phone: string;

  @Column({ nullable: false })
  agreement: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => Token, (token) => token.user, { createForeignKeyConstraints: true, lazy: true })
  @JoinColumn()
  token: Token;

  @OneToOne(() => Address, (address) => address.user, { createForeignKeyConstraints: true, lazy: true })
  @JoinColumn()
  address: Address;

  constructor() {
    super();
  }

}
