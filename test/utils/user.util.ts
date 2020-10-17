import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserDto } from '../../src/package/user/user.dto';

const uri = "/user";

export function  createUserDto(nickname: string, password: string) {
  const user = new UserDto();
  user.nickname = nickname;
  user.password = password;
  return user;
}

export function createUser(user: UserDto, app: INestApplication) {
  return request(app.getHttpServer())
  .post(uri)
  .send(user);
}