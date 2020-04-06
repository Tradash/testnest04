import { Controller, Inject, Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { DataService } from './data.service';
import { DBPoint } from '../model/db.entity';
import { IDoQuery, IGeoPoint } from '../interface';

@Controller()
export class DataController {
  // constructor() {}
  constructor(private readonly dataService: DataService) {}

  @MessagePattern({ cmd: 'getAllPoint' })
  async getAllPoint(): Promise<DBPoint[]> {
    return await this.dataService.getAllPoint();
  }

  @MessagePattern({ cmd: 'getPoint' })
  async getPoint(id: { id: number }): Promise<DBPoint> {
    return await this.dataService.getPoint(id.id);
  }

  @MessagePattern({ cmd: 'addPoint' })
  async addPoint(data: IGeoPoint): Promise<any> {
    return await this.dataService.addPoint(data);
  }
  @MessagePattern({ cmd: 'editPoint' })
  async editPoint(data: IGeoPoint): Promise<any> {
    return await this.dataService.editPoint(data);
  }

  @MessagePattern({ cmd: 'deletePoint' })
  async deletePoint(data: number): Promise<any> {
    return await this.dataService.deletePoint(data);
  }

  @MessagePattern({ cmd: 'doQuery' })
  async doQuery(data: IDoQuery): Promise<Partial<DBPoint>[]> {
    return await this.dataService.doQuery(data);
  }
}
