import { Injectable } from '@nestjs/common';
import { hashSync, compare } from 'bcrypt';

@Injectable()
export class EncryptionService {

  hash(password: string) {
    return hashSync(password, 10);
  }

  compare(password: string, hash: string) {
    return compare(password, hash);
  }

}
