import { IsAlphanumeric, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Length, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  
  @ApiProperty({ example: 'TheJoker', description: 'Nickname' })
  @MinLength(6)
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @ApiProperty({ example: 'Password1234', description: 'Password' })
  @MinLength(7)
  @MaxLength(250)
  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  password: string;
  

  @ApiProperty({ example: 'Jack', description: 'Name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;
  
  @ApiProperty({ example: 'Napier', description: 'Surname' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  lastName: string;

  @ApiProperty({ example: '123456789', description: 'Phone number' })
  @IsNotEmpty()
  @IsNumber()
  phone: number;
}