import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtConfigService } from '../../../config/service/jwt-config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  
  constructor(jwtConfigService: JwtConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfigService.secret,
      usernameField: 'nickname'
    });
  }

  async validate(payload: any) {
    return { id: payload.id, nickname: payload.nickname };
  }
}