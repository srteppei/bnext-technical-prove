import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';

@Injectable()
export class EncryptionService {

  hash(password: string) {
    return hashSync(password, 10);
  }

}
