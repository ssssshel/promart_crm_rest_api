import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { EnvVariables } from 'src/infraestructure/utils/interfaces';

@Injectable()
export class EnvConfigProvider {
  constructor(private configService: ConfigService<EnvVariables>) { }

  getEnvVariable(varName: keyof EnvVariables): string {
    return this.configService.get<string>(varName)
  }
}
