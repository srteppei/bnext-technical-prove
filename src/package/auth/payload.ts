import { ApiProperty } from '@nestjs/swagger';

export class Payload {
  
  @ApiProperty({ example: 'hash', description: 'JWT' })
  access_token: string;

  constructor(access_token: string) {
    this.access_token = access_token;
  }
  
}