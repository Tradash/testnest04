import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { PostPoint, PutPoint, GetDoQuery, GetPoint } from './dto/request.dto';
import { IUniversalString } from './classes';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    description: 'Метод для попенгуя',
    summary: 'Возвращает текстовую строку',
  })
  @ApiResponse({
    status: 200,
    description: 'Ответ сервиса',
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @UseInterceptors(CacheInterceptor)
  @Get('getEnv')
  @ApiOperation({
    description: 'Получить перечень переменных окружения',
    summary: 'Возвращает перечень активных переменных окружения',
  })
  @ApiResponse({
    status: 200,
    description: 'Ответ сервиса',
  })
  getEnv(): NodeJS.ProcessEnv {
    return this.appService.getEnv();
  }

  @Get('getMemory')
  @ApiOperation({
    description: 'Получить информацуию о использовании памяти приложением',
    summary: 'Возвращает значение объема используемой памяти',
  })
  @ApiResponse({
    status: 200,
    description: 'Ответ сервиса',
  })
  getMemory(): NodeJS.MemoryUsage {
    return this.appService.getMemory();
  }
  @ApiOperation({
    description: 'Запрос на получение информации о всех точках в БД',
    summary: 'Возвращает массив точек',
  })
  @ApiResponse({
    status: 200,
    description: 'Ответ сервиса',
  })
  @Get('AllPoint')
  getAllPoint() {
    return this.appService.getAllPoint();
  }

  /** Получить точку с указанным gid
   *
   */
  @Get('point/:id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({
    description: 'Получить точку с указанным gid',
    summary: 'Возвращает точку с указанным gid',

  })
  @ApiResponse({
    status: 200,
    description: 'Ответ сервиса',
  })
  getPoint(@Param() data: GetPoint) {
    return this.appService.getPoint(data);
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
      distance: Number(query.distance),
      lat: Number(query.lat),
      lng: Number(query.lng),
    });
  }
}
