import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "../../user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity({name: 'contact_book'})
export class ContactBookEntity {

  @PrimaryGeneratedColumn({ name: 'contact_book_id' })
  @ApiProperty({ example: 1, description: 'Id' })
  id: number;

  @ManyToOne(() => UserEntity, user => user.id)
  @JoinColumn({ name: 'user_id' })
  @Exclude()
  user: UserEntity

  @ApiProperty({ example: 'Jack Sparrow', description: 'Full name' })
  @Column({nullable: false, name: 'contact_name'})
  contactName: string;

  @ApiProperty({ example: 123456789, description: 'Phone number' })
  @Column({nullable: false})
  phone: number;
}