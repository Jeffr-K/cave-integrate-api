import { Column } from 'typeorm';

export class Phone {
  @Column()
  countryCode: string;

  @Column()
  number: string;
}
