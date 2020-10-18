import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
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

  async updateContact(userId: number, contactId: number , contactBookDto: ContactBookDto) {
    const contactBookEntity = await this.contactBookRepository.findOne(contactId);
    if (!contactBookEntity && userId !== contactBookEntity.user.id) {
      throw new UnauthorizedException();
    }
    contactBookEntity.phone = contactBookDto.phone;
    contactBookEntity.contactName = contactBookDto.contactName;
    await this.contactBookRepository.update(contactBookEntity.id, contactBookEntity);
    return contactBookEntity;
  }

  getSharedContacts(userId1: number, userId2: number) {
    return this.contactBookRepository.createQueryBuilder()
      .where(qb => `phone IN(${
        qb.subQuery()
          .select('phone')
          .from(ContactBookEntity, 'contact_book')
          .where('contact_book.user.id = :id1 OR contact_book.user.id = :id2', { id1: userId1, id2: userId2})
          .groupBy('phone')
          .having('COUNT(phone) > 1')
          .getQuery()
        }) AND user_id = :id1 OR user_id = :id2`, { id1: userId1, id2: userId2}
      )
      .getRawAndEntities()
      .then( result => result.entities );
  } 

}
