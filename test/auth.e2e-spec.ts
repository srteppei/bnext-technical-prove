import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { createUserLogin, login } from './utils/auth.util';
import { AppModule } from '../src/app.module';
import { createUser, createUserDto } from './utils/user.util';
import {useContainer} from "class-validator";

describe('AppController (e2e)', () => {
  
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    await app.init();
  });

  it('Login', async () => {
    const nickname = 'UserLogin'
    const password = 'TestLogin1234'
    const user = createUserDto(nickname, password, 'user', 'login', 741663135);
    await createUser(user, app).expect(201);
    return login(createUserLogin(nickname, password), app)
      .expect(201)
      .expect( response => {
        expect(response.body.access_token).not.toBe(null);
      })
  });

  it('Unauthorized', async () => {
    const user = createUserDto('noUser','noPassword', 'no', 'user', 774959566);
    return login(user, app)
      .expect(401);
  });
});
