import { Column } from "typeorm";

// 약관 작성
// 공정거래위원회 표준약관양식

export class Agreement {
  
  @Column()
  personalInfo: boolean;
  
  @Column()
  termsOfService: boolean;
  
  @Column()
  marketing: boolean;
  
  @Column()
  permitPushAlarm: boolean;
}