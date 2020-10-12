import { Module } from '@nestjs/common';
import { UserModule } from './package/user/user.module';
import { DatabaseModule } from './config/database/database.module';

@Module({
  imports: [UserModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
