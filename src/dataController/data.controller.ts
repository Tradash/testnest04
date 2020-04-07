import { Controller, Inject, Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { DataService } from './data.service';
import { DBPoint } from '../model/db.entity';
import { IDoQuery, IGeoPoint } from '../interface';
import { MsgResponse } from '../dto/response.dto';

/**
 * Контроллер для приема сообщений микросервиса
 */

@Controller()
export class DataController {
  constructor(private readonly dataService: DataService) {}

  /**
   * Получить все точки из БД
   */
  @MessagePattern({ cmd: 'getAllPoint' })
  async getAllPoint(): Promise<DBPoint[]> {
    return await this.dataService.getAllPoint();
  }

  /** Получить точку по ИД
   *
   * @param id - ИД искомой точки
   */

  @MessagePattern({ cmd: 'getPoint' })
  async getPoint(id: { id: number }): Promise<DBPoint> {
    return await this.dataService.getPoint(id.id);
  }

  /**
   * Добавить точку в БД
   * @param data - JSON c параметрами добавляемой точки
   */
  @MessagePattern({ cmd: 'addPoint' })
  async addPoint(data: IGeoPoint): Promise<any> {
    return await this.dataService.addPoint(data);
  }

  /**
   * Редактировать точку
   * @param data - JSON с новыми параметрами точки
   */
  @MessagePattern({ cmd: 'editPoint' })
  async editPoint(data: IGeoPoint): Promise<any> {
    return await this.dataService.editPoint(data);
  }

  /**
   * Удалить точку
   * @param data - ИД Удаляемой точки
   */

  @MessagePattern({ cmd: 'deletePoint' })
  async deletePoint(data: number): Promise<MsgResponse> {
    return await this.dataService.deletePoint(data);
  }

  /**
   * Выполнить запрос
   * @param data - JSON с параметрами запроса
   */

  @MessagePattern({ cmd: 'doQuery' })
  async doQuery(data: IDoQuery): Promise<Partial<DBPoint>[]> {
    return await this.dataService.doQuery(data);
  }
}
