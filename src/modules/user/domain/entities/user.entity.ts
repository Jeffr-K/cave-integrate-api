import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, Generated,
  PrimaryGeneratedColumn, Unique,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class User {
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

  @Column({ length: 100, nullable: false })
  address: string;

  @Column({ nullable: false })
  agreement: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

// https://jojoldu.tistory.com/600
