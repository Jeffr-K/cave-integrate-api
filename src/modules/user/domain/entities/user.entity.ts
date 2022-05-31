import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";
import { Agreement } from "./agreement.entity";
import { Email } from "../value-objects/email.value-object";
import { Password } from "../value-objects/password.value-object";
import { Phone } from "../value-objects/phone.value-object";
import { Username } from "../value-objects/username.value-object";

@Entity()
export class User {
  
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Column(() => Username)
  username: Username;
  
  @Column(() => Password)
  password: Password;
  
  @Column(() => Email)
  email: Email;
  
  @Column(() => Phone)
  phone: Phone;

  @OneToOne(() => Address, { cascade: true, onDelete: "CASCADE", primary: true })
  @JoinColumn()
  address: Address;

  @OneToOne(() => Agreement, { cascade: true, onDelete: "CASCADE", primary: true })
  @JoinColumn()
  agreement: Agreement;

}