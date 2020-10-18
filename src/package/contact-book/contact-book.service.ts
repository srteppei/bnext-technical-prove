import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { ContactBookDto } from './dto/contact-book.dto';
import { ContactBookEntity } from './entity/contact-book.entity';

@Injectable()
export class ContactBookService {

  constructor(
    @InjectRepository(ContactBookEntity)
    private contactBookRepository: Repository<ContactBookEntity>,
    private userService: UserService,
  ) {}

  async creatContactBook(userId: number, contactBookDto: ContactBookDto) {
    const contactBookEntity = new ContactBookEntity();
    contactBookEntity.user = await this.userService.getUserById(userId);
    contactBookEntity.phone = contactBookDto.phone;
    contactBookEntity.contactName = contactBookDto.contactName;
    return this.contactBookRepository.save(contactBookEntity);
  }

}
