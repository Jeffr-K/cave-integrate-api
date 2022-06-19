import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// 약관 작성
// 공정거래위원회 표준약관양식

@Entity()
export class Agreement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  personalInfo: boolean;

  @Column()
  termsOfService: boolean;

  @Column()
  marketing: boolean;

  @Column()
  permitPushAlarm: boolean;
}
