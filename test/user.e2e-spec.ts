import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserDto } from '../src/package/user/user.dto';

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
    const user = createUserDto(nickname,'Ron1234');
    return createUser(user)
      .expect(201)
      .expect( response => {
        expect(response.body.nickname).toBe(nickname);
        expect(response.body.password).toBe(undefined);
      });
  });

  it('Not duplicate nickname', async () => {
    const user = createUserDto('SpongeBob','Cangreburger');
    await createUser(user).expect(201);
    return createUser(user).expect(409);
  });

  it('Not empty password', () => {
    const userDto = createUserDto('Casper', '');
    return createUser(userDto)
      .expect(400)
      .expect( response => {
        expect(response.body.message).toEqual([
          'password must contain only letters and numbers',
          'password should not be empty'
        ])
      });
  });

  function  createUserDto(nickname: string, password: string) {
    const user = new UserDto();
    user.nickname = nickname;
    user.password = password;
    return user;
  }
  
  function createUser(user: UserDto) {
    return request(app.getHttpServer())
    .post(uri)
    .send(user);
  }
});
