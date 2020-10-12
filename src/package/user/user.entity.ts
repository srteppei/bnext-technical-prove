import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class UserEntity {

  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ nullable: false})
  nickname: string;

  @Column({ nullable: false })
  password: string;

}