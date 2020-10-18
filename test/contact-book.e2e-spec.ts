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

  it('Create contacts and get all contact', async () => {
    const nickname = 'ironMan';
    const password = 'Jarvis2009';
    await createUser(createUserDto(nickname, password, 'Tony', 'Stark', 673877221), app).expect(201);
    const token = (await login(createUserLoginDto(nickname, password), app)).body.access_token;
    const natasha = new ContactBookDto();
    natasha.phone = 673877220
    natasha.contactName = 'Natasha Romanoff';
    const natashaContact = (await createContactBook(token, natasha).expect(201)).body;
    const cap = new ContactBookDto();
    cap.phone = 673877220
    cap.contactName = 'America captain';
    const capContact = (await createContactBook(token, cap).expect(201)).body;
    const hawkEye = new ContactBookDto();
    hawkEye.phone = 673877220
    hawkEye.contactName = 'HawkEye';
    const hawkEyeContact = (await createContactBook(token, hawkEye).expect(201)).body;
    return getAllContact(token)
      .expect(200)
      .expect( response => {
        expect(response.body.length).toEqual(3);
        expect(response.body).toContainEqual(natashaContact);
        expect(response.body).toContainEqual(capContact);
        expect(response.body).toContainEqual(hawkEyeContact);
      })
  });
  
  function createContactBook(token: string, contactBookDto: ContactBookDto) {
    return request(app.getHttpServer())  
      .post(uri)
      .set('Authorization', `Bearer ${token}`)
      .send(contactBookDto)
  }

  function getAllContact(token: string) {
    return request(app.getHttpServer())  
    .get(uri)
    .set('Authorization', `Bearer ${token}`)
  }

});
