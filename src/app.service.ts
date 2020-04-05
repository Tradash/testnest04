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
// import { CHILD_SERVICE } from './dataController/data.constants';

@Injectable()
export class AppService {
  client: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8877,
      },
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
  getEnv(): NodeJS.ProcessEnv {
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
}
