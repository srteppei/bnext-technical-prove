import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { createUser, createUserDto } from './utils/user.util';

describe('AppController (e2e)', () => {
  const uri = "/auth";
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('Login', async () => {
    const nickname = 'UserLogin'
    const user = createUserDto(nickname,'TestLogin1234');
    await createUser(user, app).expect(201);
    return request(app.getHttpServer())
      .post(uri)
      .send(user)
      .expect(201)
      .expect( response => {
        expect(response.body.nickname).toBe(nickname);
        expect(response.body.id).not.toBe(null);
      })
  });

  it('Unauthorized', async () => {
    const user = createUserDto('noUser','noPassword');
    return request(app.getHttpServer())
      .post(uri)
      .send(user)
      .expect(401);
  });
});
