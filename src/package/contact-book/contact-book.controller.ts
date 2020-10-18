import { Controller, Post, UseGuards, Request, Body, UseInterceptors, ClassSerializerInterceptor, Logger } from '@nestjs/common';
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
  @ApiResponse({ status: 201, description: 'Create contact book'})
  @ApiResponse({ status: 400, description: 'Some property is not correctly'})
  createContactBook(@Body() contactBook: ContactBookDto , @Request() request) {
    return this.contactBookService.creatContactBook(request.user.id, contactBook);
  }

}
