import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';

@Entity({ name: 'user' })
export class UserEntity {

  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ nullable: false})
  nickname: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;

}