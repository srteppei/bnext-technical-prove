import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsPhoneConstraint } from '../../validator/is-phone-number.validator';
import { ConfigModule } from '../../config/config.module';
import { EncryptionModule } from '../encryption/encryption.module';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]), 
    EncryptionModule,
    HttpModule,
    ConfigModule
  ],
  controllers: [UserController],
  providers: [UserService, IsPhoneConstraint],
  exports: [
    UserService,
  ],
})
export class UserModule {}
