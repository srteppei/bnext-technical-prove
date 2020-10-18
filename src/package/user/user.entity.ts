import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ContactBookEntity } from "../contact-book/entity/contact-book.entity";

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

  @ApiProperty({ example: 123456789, description: 'Phone number' })
  @Column({nullable: false})
  phone: number;

  @OneToMany(() => ContactBookEntity, contactBook => contactBook.user, { lazy: true, cascade: ['insert', 'update', 'remove'] })
  contactBook: ContactBookEntity[];
}