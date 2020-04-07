import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataModule } from './dataController/data.module';
import { configService } from './config/configuration';

@Module({
  imports: [DataModule, CacheModule.register(configService.getRedisConfig())],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
