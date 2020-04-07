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
import { ApiOperation, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import {
  PostPointDto,
  PutPointDto,
  GetDoQueryDto,
  GetPointDto,
} from './dto/request.dto';
import { MsgResponse } from './dto/response.dto';
import { DBPoint } from './model/db.entity';

/**
 *  Роуты для сервиса по приему запросов
 */

@ApiTags('TestTask')
@Controller('TestTask')
export class AppController {
  constructor(

    private readonly appService: AppService,
  ) {}


  @Get()
  @ApiOperation({
    description: 'Метод для попенгуя',
    summary: 'Возвращает текстовую строку',
  })
  @ApiResponse({
    status: 200,
    description: 'Сервис доступен',
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
  getEnv(): NodeJS.ProcessEnv {
    return this.appService.getEnv();
  }

  @Get('getMemory')
  @ApiOperation({
    description: 'Получить информацуию о использовании памяти приложением',
    summary: 'Возвращает значение объема используемой памяти',
  })
  getMemory(): NodeJS.MemoryUsage {
    return this.appService.getMemory();
  }

  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    description: 'Запрос на получение информации о всех точках в БД',
    summary: 'Возвращает массив точек',
  })
  @ApiResponse({
    status: 200,
    description: 'Ответ сервиса',
    type: DBPoint,
    isArray: true,
  })
  @Get('AllPoint')
  getAllPoint(): Promise<DBPoint[]> {
    return this.appService.getAllPoint();
  }

  @UseInterceptors(CacheInterceptor)
  @Get('point/:id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({
    description: 'Получить точку с указанным gid',
    summary: 'Возвращает точку с указанным gid',
  })
  @ApiResponse({
    status: 200,
    description: 'Ответ сервиса',
    type: DBPoint,
  })
  getPoint(@Param() getPointDto: GetPointDto): Promise<DBPoint> {
    return this.appService.getPoint(getPointDto);
  }

  @Post('point')
  @ApiOperation({
    description: 'Добавить точку в БД',
    summary: 'Возвращает добавленную точку',
  })
  @ApiResponse({
    status: 200,
    description: 'Ответ сервиса',
    type: DBPoint,
  })
  addPoint(@Body() data: PostPointDto): Promise<DBPoint> {
    return this.appService.addPoint({
      name: data.name,
      point: { type: 'Point', coordinates: [data.lng, data.lat] },
    });
  }

  @Put('point')
  @ApiOperation({
    description: 'Изменить указанную точку',
    summary: 'Возвращает измененную точку',
  })
  @ApiResponse({
    status: 200,
    description: 'Ответ сервиса',
    type: DBPoint,
  })
  editPoint(@Body() data: PutPointDto): Promise<DBPoint> {
    return this.appService.editPoint({
      gid: data.gid,
      name: data.name,
      point: { type: 'Point', coordinates: [data.lng, data.lat] },
    });
  }

  @Delete('point/:gid')
  @ApiOperation({
    description: 'Удаление точки по ID',
    summary: 'Возвращает code:0 в случае успешной операции',
  })
  @ApiResponse({
    status: 200,
    description: 'Ответ сервиса',
    type: MsgResponse,
  })
  deletePoint(@Param('gid') gid: number): Promise<MsgResponse> {
    return this.appService.deletePoint(gid);
  }

  @UseInterceptors(CacheInterceptor)
  @Get('doQuery')
  @ApiOperation({
    description: 'Поиск точек в пределах радиуса от указанной точки',
    summary: 'Возвращает перечень точек',
  })
  @ApiResponse({
    status: 200,
    description: 'Ответ сервиса',
    type: DBPoint,
    isArray: true,
  })
  doQuery(@Query() query: GetDoQueryDto): Promise<DBPoint[]> {
    return this.appService.doQuery({
      distance: Number(query.distance),
      lat: Number(query.lat),
      lng: Number(query.lng),
    });
  }
}
