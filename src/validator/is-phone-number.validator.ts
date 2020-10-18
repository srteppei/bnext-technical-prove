import { HttpService, Injectable, Logger } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { NeutrinoApiConfigService } from '../config/service/neutrino-api-config.service';

@ValidatorConstraint({ name: 'isPhone', async: true })
@Injectable()
export class IsPhoneConstraint implements ValidatorConstraintInterface {
  
  constructor(
    private httpService: HttpService,
    private neutrinoApiConfigService: NeutrinoApiConfigService
  ) {}

  async validate(phone: number) {
    const params = {
      'user-id': this.neutrinoApiConfigService.user,
      'api-key': this.neutrinoApiConfigService.apiKey,
      'country-code': 'es',
      number: phone,
    }
    try {
      const response = await this.httpService.get('https://neutrinoapi.net/phone-validate', { params }).toPromise()
      if (response.status === 200) {
        return response.data.valid;
      } else {
        Logger.error('Problem with neutrino api')         
        Logger.error(response.data);
        return phone.toString().length === 9; // Due to 50 limit daily request
      }
    } catch (error) {
      Logger.error(error);
      return phone.toString().length === 9; // Due to 50 limit daily request
    }
  }

  defaultMessage(args: ValidationArguments) {
    return 'Not valid phone';
  }
}

export function IsPhone(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPhoneConstraint,
    });
  };
}