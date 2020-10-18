import { Injectable, Logger } from '@nestjs/common';
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
    const userEntity = await this.userService.getUserById(userId);
    const contactBookEntity = new ContactBookEntity();
    contactBookEntity.user = userEntity;
    contactBookEntity.phone = contactBookDto.phone;
    contactBookEntity.contactName = contactBookDto.contactName;
    (await userEntity.contactBook).push(contactBookEntity);
    return this.contactBookRepository.save(contactBookEntity);
  }

  getAllContact(userId: number) {
    return this.contactBookRepository.find({ where: {user: userId} })
  }

}
