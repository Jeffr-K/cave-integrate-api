import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Address {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  street: string;
  
  @Column()
  county: string;
  
  @Column()
  country: string;
  
  @Column()
  zipcode: string;
  
}