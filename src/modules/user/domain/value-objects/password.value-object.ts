import { Column } from "typeorm";

export class Password {
  
  @Column("varchar", { length: 250, nullable: false })
  password: string;

}