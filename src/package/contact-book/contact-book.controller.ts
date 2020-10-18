import { Controller, Post, UseGuards, Request, Body, UseInterceptors, ClassSerializerInterceptor, Logger, Get, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiResponse({ status: 201, description: 'Create contact book', type: ContactBookDto})
  @ApiResponse({ status: 400, description: 'Some property is not correctly'})
  @ApiResponse({ status: 401, description: 'Not authorize'})
  createContactBook(@Body() contactBook: ContactBookDto , @Request() request) {
    return this.contactBookService.creatContactBook(request.user.id, contactBook);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Get all contacts'})
  @ApiResponse({ status: 401, description: 'Not authorize'})
  @ApiResponse({ status: 409, description: 'User already exist'})
  getContactBook(@Request() request) {
    return this.contactBookService.getAllContact(request.user.id);
  }

  @Get('/shared/:userId1/:userId2')
  @ApiResponse({ status: 200, description: 'Get all shared contacts'})
  getSharedContacts(@Param('userId1') userId1: number, @Param('userId2') userId2: number) {
    return this.contactBookService.getSharedContacts(userId1, userId2);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'Update contact', type: ContactBookDto})
  @ApiResponse({ status: 401, description: 'Not authorize'})
  @ApiResponse({ status: 409, description: 'User already exist'})
  updateContact(
    @Body() contactBookDto: ContactBookDto, 
    @Param('id') contactId: number,
    @Request() request,
  ) {
    return this.contactBookService.updateContact(request.user.id, contactId, contactBookDto);
  }

}
