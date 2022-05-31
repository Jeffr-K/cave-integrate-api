import { Column } from "typeorm";

export class Username {
  
  @Column("varchar", { length: 10, nullable: false })
  firstName: string;
  
  @Column("varchar", { length: 10, nullable: true })
  middleName: string;
  
  @Column("varchar", { length: 20, nullable: false })
  LastName: string;

}