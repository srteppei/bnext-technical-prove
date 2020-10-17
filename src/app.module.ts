import { Module } from '@nestjs/common';
import { UserModule } from './package/user/user.module';
import { DatabaseModule } from './config/database/database.module';
import { EncryptionModule } from './package/encryption/encryption.module';
import { AuthModule } from './package/auth/auth.module';

@Module({
  imports: [UserModule, DatabaseModule, EncryptionModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
