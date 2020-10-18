import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { EncryptionService } from '../encryption/encryption.service';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private encryptionService: EncryptionService,
  ) {}

  async createUser(userDto: UserDto) {
    const user = await this.getUserByNickname(userDto.nickname, userDto.phone);
    if ( user === null || user === undefined) {
      const userEntity = new UserEntity();
      userEntity.nickname = userDto.nickname;
      userEntity.password = this.encryptionService.hash(userDto.password);
      userEntity.name = userDto.name;
      userEntity.lastName = userDto.lastName;
      userEntity.phone = userDto.phone;
      return this.userRepository.save(userEntity);
    } else {
      throw new HttpException('Nickname already exist', HttpStatus.CONFLICT);
    }
  }

  getUserById(id: number) {
    return this.userRepository.findOne(id);
  }

  getUserByNickname(nickname: string, phone: number) {
    return this.userRepository.findOne({ where: [{nickname}, {phone}]});
  }

}
