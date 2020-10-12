import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'bnext-contact-database',
      port: 3306,
      username: 'test',
      password: 'test',
      database: 'contact-book',
      entities: [],
      synchronize: true,
    }),
  ]
})
export class DatabaseModule {}
