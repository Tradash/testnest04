// import { PrimaryGeneratedColumn } from 'typeorm';
import { Point } from 'geojson';

import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'testdb' })
export class DBPoint {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'gid',
  })
  @ApiProperty({ example: '1', description: 'ID точки' })
  gid: number;

  @Column({ type: 'geography', srid: 4326, spatialFeatureType:"Point" })
  @ApiProperty({
    example: `{"type": "Point","coordinates": [-71.060316,48.432044]}`,
    description: 'Координата точки в формате geojson',
  })
  geog: Point;

  @Column({ type: 'varchar', length: 50 })
  @ApiProperty({ example: 'Точка №1', description: 'Имя точки' })
  namePoint: string;
}
