import { Controller, Inject, Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { DataService } from './data.service';
import { DBPoint } from '../model/db.entity';

@Controller()
export class DataController {
  // constructor() {}
  constructor(private readonly dataService: DataService) {}
  @MessagePattern({ cmd: 'sum' })
  sum(data: number[]): number {
    return (data || []).reduce((a, b) => a + b);
  }

  @MessagePattern({ cmd: 'getAllPoint' })
  async getAllPoint(): Promise<DBPoint[]> {
    return await this.dataService.getAllPoint();
  }
}
