import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  const uri = "/user";
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('Create user', () => {
    const nickname = 'Jack Sparrow';
    return request(app.getHttpServer())
      .post(uri)
      .send({nickname, password: 'Ron1234'})
      .expect(201)
      .expect( response => {
        expect(response.body.nickname).toBe(nickname);
      });
  });
});
