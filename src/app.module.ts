import { Module } from '@nestjs/common';
import { UserModule } from './package/user/user.module';
import { DatabaseModule } from './config/database/database.module';
import { EncryptionModule } from './package/encryption/encryption.module';

@Module({
  imports: [UserModule, DatabaseModule, EncryptionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
