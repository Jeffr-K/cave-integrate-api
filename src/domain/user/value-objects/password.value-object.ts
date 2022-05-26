import { Column } from "typeorm";

export class Password {
  
  @Column()
  password: string;

}