import { Module } from '@nestjs/common';
import { UserModule } from './package/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
