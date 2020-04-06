import {
  Body,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { PostPoint, PutPoint, GetDoQuery } from './dto/request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /** Для попингуя
   *
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /** Получить перечень переменных окружения
   *
   */
  @UseInterceptors(CacheInterceptor)
  @Get('getEnv')
  // @CacheKey('getEnv')
  // @CacheTTL(60)
  getEnv(): NodeJS.ProcessEnv {
    return this.appService.getEnv();
  }

  /** Утилизация памяти приложением
   *
   */
  @Get('getMemory')
  getMemory(): NodeJS.MemoryUsage {
    return this.appService.getMemory();
  }

  /** Отправка микросервису тестового сообщения
   *
   */
  @Get('sendM')
  sendMessage(): Observable<number> {
    return this.appService.sendMessageSum();
  }

  /** Получить перечень всех точек в БД
   *
   */
  @Get('AllPoint')
  getAllPoint() {
    return this.appService.getAllPoint();
    // return 'Вернуть все точки';
  }

  /** Получить точку с указанным gid
   *
   */
  @Get('point/:id')
  getPoint() {
    return 'Вернуть указанную точку';
  }

  /** Добавить точку в БД
   *
   * @param data
   */

  @Post('point')
  addPoint(@Body() data: PostPoint) {
    return this.appService.addPoint({
      name: data.name,
      point: { type: 'Point', coordinates: [data.lng, data.lat] },
    });
  }

  /** Изменить указанную точку
   *
   * @param data
   */

  @Put('point')
  editPoint(@Body() data: PutPoint) {
    return this.appService.editPoint({
      gid: data.gid,
      name: data.name,
      point: { type: 'Point', coordinates: [data.lng, data.lat] },
    });
  }

  /** Удалить указанную точку
   *
   * @param gid
   */
  @Delete('point/:gid')
  deletePoint(@Param('gid') gid: number) {
    return this.appService.deletePoint(gid);
  }

  @Get('doQuery')
  doQuery(@Query() query: GetDoQuery) {
    return this.appService.doQuery({
      distance:Number(query.distance),
      lat:Number(query.lat),
      lng:Number(query.lng)
    })
  }
}
