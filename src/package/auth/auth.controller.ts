import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiTags,
  ApiResponse
} from '@nestjs/swagger';
import { LocalGuard } from './guard/local.guard';
import { Payload } from './payload';
import { UserLoginDto } from './dto/user-login.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post()
  @ApiResponse({ status: 201, description: 'Token generated', type: Payload})
  @ApiResponse({ status: 401, description: 'Not authorized'})
  async login(@Body() userDto: UserLoginDto ,@Request() request) {
    return this.authService.login(request.user);
  }

}
