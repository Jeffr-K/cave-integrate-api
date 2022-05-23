import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";
import { Agreement } from "../value-objects/agreement.value-object";
import { Email } from "../value-objects/email.value-object";
import { Password } from "../value-objects/password.value-object";
import { Phone } from "../value-objects/phone.value-object";
import { Username } from "../value-objects/username.value-object";

@Entity()
export class User {
  
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Column()
  username: Username;
  
  @Column()
  password: Password;
  
  @Column()
  email: Email;
  
  @Column()
  phone: Phone;
  
  @Column()
  address: Address;
  
  @Column()
  agreement: Agreement;

}