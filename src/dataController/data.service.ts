import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DBPoint } from '../model/db.entity';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(DBPoint) private readonly repo: Repository<DBPoint>,
  ) {}

  async getAllPoint() {
    return await this.repo.find();
  }
}
