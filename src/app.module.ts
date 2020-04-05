import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import configuration from './config/configuration';
// import { MAIN_SERVICE } from './app.constants';
import { DataModule } from './dataController/data.module';
// import { CHILD_SERVICE } from './dataController/data.constants';
// import { MainModule } from './mainController/main.module';
// import { MainService } from './mainController/main.service';
// import { MainController } from './mainController/main.controller';

@Module({
  imports: [
    // ClientsModule.register([{ name: CHILD_SERVICE, transport: Transport.TCP }]),
    DataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
