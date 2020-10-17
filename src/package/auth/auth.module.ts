import { Module } from '@nestjs/common';
import { EncryptionModule } from '../encryption/encryption.module';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    EncryptionModule,
    UserModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
  ],
  controllers: [AuthController]
})
export class AuthModule {}
