import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService {

  constructor(private configService: ConfigService) {}

  get secret() {
    return this.configService.get('jwt.secret');
  }

}
