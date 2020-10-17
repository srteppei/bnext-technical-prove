import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors, Request } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {

  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'User info', type: UserEntity})
  @ApiResponse({ status: 401, description: 'Not authorized to display the information'})
  getUserById(@Request() request) {
    return this.userService.getUserById(request.user.id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'User created', type: UserEntity})
  @ApiResponse({ status: 400, description: 'Some property is not correctly'})
  @ApiResponse({ status: 409, description: 'User already exist'})
  createUser(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
  }

}
