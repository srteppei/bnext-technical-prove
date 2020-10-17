import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { DatabaseConfigService } from './service/databaseconfig.service';
import { JwtConfigService } from './service/jwt-config.service';
import configuration from './configuration';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(3000),
        database: Joi.object({
          user: Joi.string(),
          password: Joi.string(),
          collection: Joi.string(),
          host: Joi.string(),
          port: Joi.string().default(3306),
        }),
        jwt: Joi.object({
          secret: Joi.string(),
        })
      })
    })
  ],
  providers: [DatabaseConfigService, JwtConfigService],
  exports: [
    DatabaseConfigService,
    JwtConfigService,
  ],
})
export class ConfigModule {}
