import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {

  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
  }

}
