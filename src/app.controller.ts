import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EnvConfigProvider } from './infraestructure/configuration/env-config-provider/env-config-provider';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly envConfigProvider: EnvConfigProvider
  ) { }

  @Get()
  getHello(): string {

    return this.appService.getHello();
  }
}
