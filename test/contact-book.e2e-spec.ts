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

  it('Get shared contacts', async () => {
    const nickname1 = 'user01';
    const password1 = 'user001';
    const user1 = (await createUser(createUserDto(nickname1, password1, 'Tony', 'Stark', 673877222), app).expect(201)).body;
    const tokenUser1 = (await login(createUserLoginDto(nickname1, password1), app)).body.access_token;
    const nickname2 = 'user02';
    const password2 = 'user002';
    const user2 = (await createUser(createUserDto(nickname2, password2, 'Tony', 'Stark', 673877223), app).expect(201)).body;
    const tokenUser2 = (await login(createUserLoginDto(nickname2, password2), app)).body.access_token;
    // Contacts
    const natasha = new ContactBookDto();
    natasha.phone = 673877221
    natasha.contactName = 'Natasha Romanoff';
    const cap = new ContactBookDto();
    cap.phone = 673877220
    cap.contactName = 'America captain';
    const hawkEye = new ContactBookDto();
    hawkEye.phone = 673877222
    hawkEye.contactName = 'HawkEye';
    //  Create contacts
    const capContactUser1 = (await createContactBook(tokenUser1, cap).expect(201)).body;
    const natashaContactUser1 = (await createContactBook(tokenUser1, natasha).expect(201)).body;
    (await createContactBook(tokenUser1, hawkEye).expect(201)).body;
    const capContactUser2 = (await createContactBook(tokenUser2, cap).expect(201)).body;
    const natashaContactUSer2 = (await createContactBook(tokenUser2, natasha).expect(201)).body;
    return getSharedContacts(user1.id, user2.id)
      .expect(200)
      .expect( response => {
        expect(response.body.length).toEqual(4);
        expect(response.body).toContainEqual(capContactUser1);
        expect(response.body).toContainEqual(natashaContactUser1);
        expect(response.body).toContainEqual(capContactUser2);
        expect(response.body).toContainEqual(natashaContactUSer2);
      })
  });

  it('Update contact', async () => {
    const nickname = 'victim';
    const password = 'victim01';
    await createUser(createUserDto(nickname, password, 'victim', 'victim', 665541790), app);
    const token = (await login(createUserLoginDto(nickname, password), app)).body.access_token;;
    const contactBookDto = new ContactBookDto();
    contactBookDto.phone = 673877220;
    contactBookDto.contactName = 'Natasha Romanoff';
    const contact = (await createContactBook(token, contactBookDto)).body;
    contactBookDto.contactName = 'Peter Parker';
    return updateContactBook(token, contact.id, contactBookDto)
      .expect(200)
      .expect( response => {
        expect(response.body.contactName).toBe('Peter Parker');
      });
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

  function getSharedContacts(userId1: number, userId2: number) {
    return request(app.getHttpServer())  
    .get(`${uri}/shared/${userId1}/${userId2}`);
  }

  function updateContactBook(token: string, contactId: number ,contactBookDto: ContactBookDto) {
    return request(app.getHttpServer())  
      .put(`${uri}/${contactId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(contactBookDto);
  }

});
