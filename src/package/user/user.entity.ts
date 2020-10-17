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

  @ApiProperty({ example: 'Jack', description: 'Name' })
  @Column({nullable: false})
  name: string;
  
  @ApiProperty({ example: 'Napier', description: 'Surname' })
  @Column({nullable: false, name: 'last_name'})
  lastName: string;

  @ApiProperty({ example: '123456789', description: 'Phone number' })
  @Column({nullable: false})
  phone: number;

}