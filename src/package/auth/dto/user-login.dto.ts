import { IsAlphanumeric, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {

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
}