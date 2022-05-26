import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";
import { Agreement } from "../value-objects/agreement.value-object";
import { Email } from "../value-objects/email.value-object";
import { Password } from "../value-objects/password.value-object";
import { Phone } from "../value-objects/phone.value-object";
import { Username } from "../value-objects/username.value-object";

@Entity()
export class User extends BaseEntity {
  
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
  
  @Column(() => Address)
  address: Address;
  
  @Column(() => Agreement)
  agreement: Agreement;

}