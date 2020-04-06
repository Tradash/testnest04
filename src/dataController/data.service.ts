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
  async doQuery(data: IDoQuery) {
    const param1 = `SRID=4326;POINT(${data.lat} ${data.lng})`;
    const query = `SELECT "namePoint", "geog", ST_Distance(
               "geog",
               ST_GeomFromEWKT('${param1}')
             ) FROM myfirstdb
    where ST_Distance(
               "geog",
               ST_GeomFromEWKT('${param1}')
             )<${data.distance}`;

    console.log(data);
    return await this.repo.query(query );
  }
}
