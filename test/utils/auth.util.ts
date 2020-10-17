import { INestApplication } from "@nestjs/common";
import { UserDto } from "../../src/package/user/user.dto";
import * as request from 'supertest';

const uri = "/auth";

export function login(user: UserDto, app: INestApplication) {
  return request(app.getHttpServer())
  .post(uri)
  .send(user);
}