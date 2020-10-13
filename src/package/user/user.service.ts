import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { EncryptionService } from '../encryption/encryption.service';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private encryptionService: EncryptionService,
  ) {}

  async createUser(userDto: UserEntity) {
    const user = await this.getUserByNickname(userDto.nickname);
    if ( user === null || user === undefined) {
      const userEntity = new UserEntity();
      userEntity.nickname = userDto.nickname;
      userEntity.password = this.encryptionService.hash(userDto.password);
      return this.userRepository.save(userEntity);
    } else {
      throw new HttpException('Nickname already exist', HttpStatus.CONFLICT);
    }
  }

  getUserByNickname(nickname: string) {
    return this.userRepository.findOne({ where: {nickname} });
  }

}
