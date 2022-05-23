import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Token {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

}