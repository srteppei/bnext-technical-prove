import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'user' })
export class UserEntity {

  @PrimaryGeneratedColumn({ name: 'user_id' })
  @ApiProperty({ example: 1, description: 'Id' })
  id: number;

  @Column({ nullable: false})
  @ApiProperty({ example: 'TheJoker', description: 'Nickname' })
  nickname: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;

}