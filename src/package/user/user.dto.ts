import { IsAlphanumeric, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UserDto {
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  nickname: string;
  @MaxLength(250)
  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  password: string;
}