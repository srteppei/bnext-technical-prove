import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { createUserLoginDto, login } from './utils/auth.util';
import { AppModule } from '../src/app.module';
import { createUser, createUserDto } from './utils/user.util';
import {useContainer} from "class-validator";
import { ContactBookDto } from '../src/package/contact-book/dto/contact-book.dto';
import * as request from 'supertest';

describe('Contact book (e2e)', () => {
  
  let app: INestApplication;
  const uri = '/contact-book';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    await app.init();
  });

  it('Create contact book', async () => {
    const nickname = 'hulk01';
    const password = 'HulkIsAngry';
    await createUser(createUserDto(nickname, password, 'Bruce', 'Banner', 673877220), app).expect(201);
    const token = (await login(createUserLoginDto(nickname, password), app)).body.access_token;
    const contactBookDto = new ContactBookDto();
    contactBookDto.phone = 673877220
    contactBookDto.contactName = 'Natasha Romanoff';
    return createContactBook(token, contactBookDto)
      .expect(201)
      .expect( response => {
        expect(response.body.contactName).toBe(contactBookDto.contactName);
        expect(response.body.phone).toBe(contactBookDto.phone);
        expect(response.body.id).not.toBe(null);
      })
  });

  it('Try to add a contact without token', async () => {
    const nickname = 'victim';
    const password = 'victim01';
    await createUser(createUserDto(nickname, password, 'victim', 'victim', 665541790), app);
    const token = null;
    const contactBookDto = new ContactBookDto();
    contactBookDto.phone = 673877220;
    contactBookDto.contactName = 'Natasha Romanoff';
    return createContactBook(token, contactBookDto)
      .expect(401);
  });

  it('Try to add a contact with invalid phone', async () => {
    const nickname = 'invalidphone';
    const password = 'invalidphone';
    await createUser(createUserDto(nickname, password, 'victim', 'victim', 665541791), app);
    const token = (await login(createUserLoginDto(nickname, password), app)).body.access_token;
    const contactBookDto = new ContactBookDto();
    contactBookDto.phone = 1111;
    contactBookDto.contactName = 'Natasha Romanoff';
    return createContactBook(token, contactBookDto)
      .expect(400)
      .expect(response => {
        expect(response.body.message).toEqual(['Not valid phone'])
      });
  });
  
  function createContactBook(token: string, contactBookDto: ContactBookDto) {
    return request(app.getHttpServer())  
      .post(uri)
      .set('Authorization', `Bearer ${token}`)
      .send(contactBookDto)
  }

});
