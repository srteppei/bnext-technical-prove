import { Injectable } from '@nestjs/common';
import { EncryptionService } from '../encryption/encryption.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private encryptionService: EncryptionService
  ) {}

  async validateUser(nickname: string, password: string) {
    const user = await this.userService.getUserByNickname(nickname);

    if (!user) return null;

    const isValid = await this.encryptionService.compare(password, user.password)
    if (isValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

}
