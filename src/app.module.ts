import { Module } from '@nestjs/common';
import { UserModule } from './package/user/user.module';
import { DatabaseModule } from './config/database/database.module';
import { EncryptionModule } from './package/encryption/encryption.module';
import { AuthModule } from './package/auth/auth.module';
import { ContactBookModule } from './package/contact-book/contact-book.module';

@Module({
  imports: [UserModule, DatabaseModule, EncryptionModule, AuthModule, ContactBookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
