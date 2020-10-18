import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';
import { UserLoginDto } from "../../src/package/auth/dto/user-login.dto";

const uri = "/auth";

export function login(user: UserLoginDto, app: INestApplication) {
  return request(app.getHttpServer())
  .post(uri)
  .send(user);
}

export function createUserLogin(nickname: string, password: string) {
  const userLogin = new UserLoginDto();
  userLogin.password = password;
  userLogin.nickname = nickname;
  return userLogin;
}