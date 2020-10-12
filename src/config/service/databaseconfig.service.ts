import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from 'src/package/user/user.entity';

@Injectable()
export class DatabaseConfigService {

  constructor(private configService: ConfigService) {}

  get databaseHost() {
    return this.configService.get('database.host');
  }

  get databasePort() {
    return this.configService.get('database.port');
  }

  get databaseUser() {
    return this.configService.get('database.user');
  }

  get databasePassword() {
    return this.configService.get('database.password');
  }

  get databaseCollection() {
    return this.configService.get('database.collection');
  }

  get typeOrmConfig() {
    const config: TypeOrmModuleOptions = {
      type: 'mysql',
      host: this.databaseHost,
      port: this.databasePort,
      username: this.databaseUser,
      password: this.databasePassword,
      database: this.databaseCollection,
      entities: [UserEntity],
    };
    return config;
  }

}
