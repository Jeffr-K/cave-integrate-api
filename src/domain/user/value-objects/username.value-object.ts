import { Column } from "typeorm";

export class Username {
  
  @Column()
  firstName: string;
  
  @Column()
  middleName: string;
  
  @Column()
  LastName: string;

}