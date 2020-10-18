import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { IsPhone } from "src/validator/is-phone-number.validator";

export class ContactBookDto {
  
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  @ApiProperty({ example: 'Jack Sparrow', description: 'Name' })
  contactName: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPhone()
  @ApiProperty({ example: '123456789', description: 'Phone number' })
  phone: number;
}