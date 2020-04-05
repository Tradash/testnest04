// import { PrimaryGeneratedColumn } from 'typeorm';
import { Point } from 'geojson';

import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'myfirstdb' })
export class DBPoint {
  @PrimaryColumn({ type: 'integer' })
  gid: number;

  @Column({ type: 'geometry' })
  geog: Point;
}
