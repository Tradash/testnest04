import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('getEnv')
  getEnv(): NodeJS.ProcessEnv {
    return this.appService.getEnv();
  }
  @Get('getMemory')
  getMemory(): NodeJS.MemoryUsage {
    return this.appService.getMemory();
  }
}
