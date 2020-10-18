import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config.module';
import { DatabaseConfigService } from '../service/databaseconfig.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [DatabaseConfigService],
      useFactory: (config: DatabaseConfigService) => config.typeOrmConfig,
    }),
  ]
})
export class DatabaseModule {}
