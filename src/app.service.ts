import { Inject, Injectable } from '@nestjs/common';
// import { MAIN_SERVICE } from './app.constants';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Point } from 'geojson';
import { DBPoint } from './model/db.entity';
import { IDoQuery, IGeoPoint } from './interface';
import { configService } from './config/configuration';
// import { CHILD_SERVICE } from './dataController/data.constants';

@Injectable()
export class AppService {
  client: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.NATS,
      options: { url: configService.getNatsConfig() },
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
  getEnv(): NodeJS.ProcessEnv {
    console.log('Делаю сервис');
    return process.env;
  }
  getMemory(): NodeJS.MemoryUsage {
    const z = process.memoryUsage();
    Object.keys(z).map(x => {
      z[x] = `${(z[x] / 1024 / 1024).toFixed(4)} Mb`;
    });
    return z;
  }

  sendMessageSum(): Observable<number> {
    const pattern = { cmd: 'sum' };
    const data = [1, 2, 3, 4, 5];
    return this.client.send<number>(pattern, data);
  }

  getAllPoint(): Observable<DBPoint[]> {
    const pattern = { cmd: `getAllPoint` };
    return this.client.send<DBPoint[]>(pattern, {});
  }

  addPoint(data: IGeoPoint): Observable<any> {
    const pattern = { cmd: `addPoint` };
    return this.client.send(pattern, data);
  }

  editPoint(data: IGeoPoint): Observable<any> {
    const pattern = { cmd: `editPoint` };
    return this.client.send(pattern, data);
  }

  deletePoint(data: number): Observable<any> {
    const pattern = { cmd: 'deletePoint' };
    return this.client.send(pattern, data);
  }

  doQuery(data: IDoQuery): Observable<Partial<DBPoint>[]> {
    const pattern = { cmd: 'doQuery' };
    return this.client.send(pattern, data);
  }
}
