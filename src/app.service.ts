import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getEnv(): NodeJS.ProcessEnv {
    return process.env;
  }
  getMemory(): NodeJS.MemoryUsage {
    const z=process.memoryUsage();
    Object.keys(z).map(x=>{
      z[x] = `${(z[x]/1024/1024).toFixed(4)} Mb`;
    });
    return z
  }
}
