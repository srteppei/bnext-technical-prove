import { Controller, Post, UseGuards, Request, Body, UseInterceptors, ClassSerializerInterceptor, Logger, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { request } from 'express';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { ContactBookService } from './contact-book.service';
import { ContactBookDto } from './dto/contact-book.dto';

@ApiTags('Contact book')
@Controller('contact-book')
@UseInterceptors(ClassSerializerInterceptor)
export class ContactBookController {

  constructor(
    private contactBookService: ContactBookService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Create contact book'})
  @ApiResponse({ status: 400, description: 'Some property is not correctly'})
  @ApiResponse({ status: 401, description: 'Not authorize'})
  createContactBook(@Body() contactBook: ContactBookDto , @Request() request) {
    return this.contactBookService.creatContactBook(request.user.id, contactBook);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Create contact book'})
  @ApiResponse({ status: 401, description: 'Not authorize'})
  getContactBook(@Request() request) {
    return this.contactBookService.getAllContact(request.user.id);
  }

}
