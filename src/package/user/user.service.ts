import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userEntity: UserEntity) {
    const user = await this.getUserByNickname(userEntity.nickname);
    if ( user === null || user === undefined) {
      return this.userRepository.save(userEntity);
    } else {
      throw new HttpException('Nickname already exist', HttpStatus.CONFLICT);
    }
  }

  getUserByNickname(nickname: string) {
    return this.userRepository.findOne({ where: {nickname} });
  }

}
