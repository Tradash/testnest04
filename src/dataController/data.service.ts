import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DBPoint } from '../model/db.entity';
import { IDoQuery, IGeoPoint } from '../interface';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(DBPoint) private readonly repo: Repository<DBPoint>,
  ) {}

  async getAllPoint() {
    console.log('Д я делаю запрос');
    return await this.repo.find();
  }

  async getPoint(id: number): Promise<DBPoint> {
    return (await this.repo.findOne({ gid: id })) || ({} as DBPoint);
  }

  async addPoint(data: IGeoPoint) {
    return await this.repo.save({
      namePoint: data.name,
      geog: data.point,
    });
  }

  async editPoint(data: IGeoPoint) {
    return await this.repo.save({
      gid: data.gid,
      namePoint: data.name,
      geog: data.point,
    });
  }

  async deletePoint(data: number) {
    return await this.repo.delete({
      gid: data,
    });
  }
  async doQuery(data: IDoQuery): Promise<Partial<DBPoint>[]> {
    const param1 = JSON.stringify({
      type: 'Point',
      coordinates: [data.lat, data.lng],
    });
    return await this.repo
      .createQueryBuilder()
      .select()
      .where(`ST_Distance("geog", ST_GeomFromGeoJSON(:id1)::geometry)<:id2`, {
        id1: param1,
        id2: data.distance,
      })
      .getMany();
  }
}
