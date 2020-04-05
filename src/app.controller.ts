import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

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
  @Get('sendM')
  sendMessage(): Observable<number> {
    return this.appService.sendMessageSum();
  }

  @Get('AllPoint')
  getAllPoint() {
    return this.appService.getAllPoint();
    // return 'Вернуть все точки';
  }

  @Get('point/:id')
  getPoint() {
    return 'Вернуть указанную точку';
  }

  @Post('point')
  addPoint() {
    return 'Добавить точку в БД';
  }

  @Put('point')
  editPoint() {
    return 'Отредактировать точку';
  }

  @Delete('point')
  deletePoint() {
    return 'Удалить точку';
  }

  @Get('doQuery')
  doQuery() {
    return 'Выполнить запрос к БД';
  }
}
