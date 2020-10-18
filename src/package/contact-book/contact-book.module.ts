import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ContactBookController } from './contact-book.controller';
import { ContactBookService } from './contact-book.service';
import { ContactBookEntity } from './entity/contact-book.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([ContactBookEntity])
  ],
  controllers: [ContactBookController],
  providers: [ContactBookService]
})
export class ContactBookModule {}
