import { Module } from '@nestjs/common';
import { EncryptionModule } from '../encryption/encryption.module';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../../config/config.module';
import { JwtConfigService } from '../../config/service/jwt-config.service';

@Module({
  imports: [
    PassportModule,
    EncryptionModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [JwtConfigService],
      useFactory: (jwtConfigService: JwtConfigService) => ({
        secret: jwtConfigService.secret, 
        signOptions: { expiresIn: '24h'}
      })
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
  ],
  controllers: [AuthController]
})
export class AuthModule {}
