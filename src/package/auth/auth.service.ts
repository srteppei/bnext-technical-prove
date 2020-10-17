import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from '../encryption/encryption.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private encryptionService: EncryptionService,
    private jwtService: JwtService,
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

  async login(user: any) {
    return {
      access_token: this.jwtService.sign(user)
    }
  }

}
