import { IsAlphanumeric, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UserDto {
  @MinLength(6)
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @MinLength(7)
  @MaxLength(250)
  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  password: string;
}