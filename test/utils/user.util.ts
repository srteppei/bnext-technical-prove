import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserDto } from '../../src/package/user/user.dto';

const uri = "/user";

export function  createUserDto(nickname: string, password: string, name: string, lsatName: string, phone: number) {
  const user = new UserDto();
  user.nickname = nickname;
  user.password = password;
  user.lastName = lsatName;
  user.name = name;
  user.phone = phone;
  return user;
}

export function createUser(user: UserDto, app: INestApplication) {
  return request(app.getHttpServer())
  .post(uri)
  .send(user);
}

export function getUser(id: number, token: string, app: INestApplication) {
  return request(app.getHttpServer())
  .get(`${uri}`)
  .set('Authorization', `Bearer ${token}`)
}