import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {

  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() userDto: UserEntity) {
    return this.userService.createUser(userDto);
  }

}
