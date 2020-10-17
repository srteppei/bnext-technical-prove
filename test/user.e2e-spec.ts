import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { createUserDto, createUser, getUser } from './utils/user.util';
import { login } from './utils/auth.util';


describe('AppController (e2e)', () => {
  
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
    const user = createUserDto(nickname,'Ron1234', 'Jack', 'Sparrow', 111111111);
    return createUser(user, app)
      .expect(201)
      .expect( response => {
        expect(response.body.nickname).toBe(nickname);
        expect(response.body.password).toBe(undefined);
      });
  });

  it('Not duplicate nickname', async () => {
    const user = createUserDto('SpongeBob','Cangreburger', 'Bob', 'Sponge', 222222222);
    await createUser(user, app).expect(201);
    return createUser(user,app).expect(409);
  });

  it('Not empty password', () => {
    const userDto = createUserDto('Casper', '', 'Casper', 'Ghost', 333333333);
    return createUser(userDto, app)
      .expect(400)
      .expect( response => {
        expect(response.body.message).toEqual([
          'password must contain only letters and numbers',
          'password should not be empty',
          'password must be longer than or equal to 7 characters'
        ])
      });
  });

  it('Nickname length can not be greater than 20' , () => {
    const userDto = createUserDto('123456789012345678901','1234567', 'random', 'random', 444444444);
    return createUser(userDto, app)
      .expect(400)
      .expect( response => 
        expect(response.body.message).toEqual(['nickname must be shorter than or equal to 20 characters'])
      );
  });

  it('Nickname length can not be lower than 6' , () => {
    const userDto = createUserDto('12345','1234567', 'random', 'random', 555555555);
    return createUser(userDto, app)
      .expect(400)
      .expect( response => 
        expect(response.body.message).toEqual(['nickname must be longer than or equal to 6 characters'])
      );
  });

  it('Nickname can not be empty', () => {
    const userDto = createUserDto('','1234567', 'random', 'random', 666666666);
    return createUser(userDto, app)
      .expect(400)
      .expect( response => 
        expect(response.body.message).toEqual([
          'nickname should not be empty',
          'nickname must be longer than or equal to 6 characters'
        ])
      );
  });

  it('Get user info', async () => {
    const userDto = createUserDto('UserInfo', 'UserInfo', 'user', 'info', 777777777);
    const id = (await createUser(userDto, app)).body.id;
    const token = (await login(userDto, app)).body.access_token;
    return getUser(id, token, app).expect(200);
  });

  it('Get user info unauthorized', async () => {
    const userDto = createUserDto('UserInfoFake', 'UserInfoFake', 'user', 'info fake', 888888888)
    const id = (await createUser(userDto, app)).body.id;
    return getUser(id, null, app).expect(401);
  });
});
