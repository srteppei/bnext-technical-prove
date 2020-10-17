import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { createUserDto, createUser } from './utils/user.util';


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
    const user = createUserDto(nickname,'Ron1234');
    return createUser(user, app)
      .expect(201)
      .expect( response => {
        expect(response.body.nickname).toBe(nickname);
        expect(response.body.password).toBe(undefined);
      });
  });

  it('Not duplicate nickname', async () => {
    const user = createUserDto('SpongeBob','Cangreburger');
    await createUser(user, app).expect(201);
    return createUser(user,app).expect(409);
  });

  it('Not empty password', () => {
    const userDto = createUserDto('Casper', '');
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
    const userDto = createUserDto('123456789012345678901','1234567');
    return createUser(userDto, app)
      .expect(400)
      .expect( response => 
        expect(response.body.message).toEqual(['nickname must be shorter than or equal to 20 characters'])
      );
  });

  it('Nickname length can not be lower than 6' , () => {
    const userDto = createUserDto('12345','1234567');
    return createUser(userDto, app)
      .expect(400)
      .expect( response => 
        expect(response.body.message).toEqual(['nickname must be longer than or equal to 6 characters'])
      );
  });

  it('Nickname can not be empty', () => {
    const userDto = createUserDto('','1234567');
    return createUser(userDto, app)
      .expect(400)
      .expect( response => 
        expect(response.body.message).toEqual([
          'nickname should not be empty',
          'nickname must be longer than or equal to 6 characters'
        ])
      );
  });

});
