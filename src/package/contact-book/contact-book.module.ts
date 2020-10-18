import { Module } from '@nestjs/common';
import { ContactBookController } from './contact-book.controller';
import { ContactBookService } from './contact-book.service';

@Module({
  controllers: [ContactBookController],
  providers: [ContactBookService]
})
export class ContactBookModule {}
