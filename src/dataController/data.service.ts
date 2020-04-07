import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DBPoint } from '../model/db.entity';
import { IDoQuery, IGeoPoint } from '../interface';
import { MsgResponse } from '../dto/response.dto';

/**
 * Класс для выполнения непосредственных запросов к БД
 */

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(DBPoint) private readonly repo: Repository<DBPoint>,
  ) {}

  /**
   * Получить все точки из БД
   */

  async getAllPoint() {
    return await this.repo.find();
  }

  /**
   * Получить точки по ИД
   * @param id - ИД точки
   */

  async getPoint(id: number): Promise<DBPoint> {
    return (await this.repo.findOne({ gid: id })) || ({} as DBPoint);
  }

  /**
   * Сохранить точку в БД
   * @param data - JSON c параметрами точки
   */
  async addPoint(data: IGeoPoint) {
    return await this.repo.save({
      namePoint: data.name,
      geog: data.point,
    });
  }

  /**
   * Изменить точку в БД
   * @param data - JSON c новыми парамтерами точки
   */
  async editPoint(data: IGeoPoint) {
    return await this.repo.save({
      gid: data.gid,
      namePoint: data.name,
      geog: data.point,
    });
  }

  /**
   * Удалить точку по ИД
   * @param data - ИД точки
   */

  async deletePoint(data: number): Promise<MsgResponse> {
    const resp = await this.repo.delete({
      gid: data,
    });
    if (resp.affected === 1)
      return {
        code: 0,
        message: 'Точка успешно удалена',
      };
    else
      return {
        code: 1,
        message: 'Точка не удалена',
      };
  }

  /**
   * Выполнить запрос
   * @param data - JSON c параметрами запроса
   */
  async doQuery(data: IDoQuery): Promise<Partial<DBPoint>[]> {
    const param1 = JSON.stringify({
      type: 'Point',
      coordinates: [data.lat, data.lng],
    });
    return await this.repo
      .createQueryBuilder()
      .select()
      .where(`ST_Distance("geog", ST_GeomFromGeoJSON(:id1)::geometry)<:id2`, {
        id1: param1,
        id2: data.distance,
      })
      .getMany();
  }
}
