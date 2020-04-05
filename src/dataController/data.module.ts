import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataController } from './data.controller';
import { configService } from '../config/configuration';
import { DataService } from './data.service';
import { DBPoint } from '../model/db.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([DBPoint]),
  ],

  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
