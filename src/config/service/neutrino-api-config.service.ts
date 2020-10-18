import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NeutrinoApiConfigService {

  constructor(private configService: ConfigService) {}

  get user() {
    return this.configService.get('neutrinoapi.userId');
  }

  get apiKey() {
    return this.configService.get('neutrinoapi.apiKey');
  }

}
