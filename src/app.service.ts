import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { DBPoint } from './model/db.entity';
import { IDoQuery, IGeoPoint } from './interface';
import { configService } from './config/configuration';
import { GetPointDto } from './dto/request.dto';
import { MsgResponse } from './dto/response.dto';

@Injectable()
export class AppService {
  client: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.NATS,
      options: { url: configService.getNatsConfig() },
    });
  }

  /**
   * Сообщение для поппингуя
   */

  getHello(): string {
    return 'Hello World!';
  }

  /**
   * Получение списка переменных окружения
   */
  getEnv(): NodeJS.ProcessEnv {
    console.log('Делаю сервис');
    return process.env;
  }

  /**
   * Утилизация памяти
   */

  getMemory(): NodeJS.MemoryUsage {
    const z = process.memoryUsage();
    Object.keys(z).map(x => {
      z[x] = `${(z[x] / 1024 / 1024).toFixed(4)} Mb`;
    });
    return z;
  }

  /**
   *  Получить все точки из БД
   */
  async getAllPoint(): Promise<DBPoint[]> {
    const pattern = { cmd: `getAllPoint` };
    return await this.client.send<DBPoint[]>(pattern, {}).toPromise();
  }

  /**
   * Получить точку по ID
   * @param data - JSON c ID искомой точки
   */

  async getPoint(data: GetPointDto): Promise<DBPoint> {
    const pattern = { cmd: 'getPoint' };
    return this.client.send<DBPoint>(pattern, data).toPromise();
  }

  /**
   * Добавить точку в БД
   * @param data - JSON с данными о добавляемой точке
   */

  async addPoint(data: IGeoPoint): Promise<DBPoint> {
    const pattern = { cmd: `addPoint` };
    return await this.client.send<DBPoint>(pattern, data).toPromise();
  }

  /**
   * Отредактировать точку в БД
   * @param data - JSON с новыми данными для точки
   */
  editPoint(data: IGeoPoint): Promise<DBPoint> {
    const pattern = { cmd: `editPoint` };
    return this.client.send(pattern, data).toPromise();
  }

  /**
   * Удалить точку
   * @param data - ID точки подлежащей удалению
   */
  deletePoint(data: number): Promise<MsgResponse> {
    const pattern = { cmd: 'deletePoint' };
    return this.client.send(pattern, data).toPromise();
  }

  /**
   * Выполнить запрос на поиск точек
   * @param data - JSON c параметрами запроса
   */

  doQuery(data: IDoQuery): Promise<DBPoint[]> {
    const pattern = { cmd: 'doQuery' };
    return this.client.send(pattern, data).toPromise();
  }
}
