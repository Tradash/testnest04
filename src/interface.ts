import { Point } from 'geojson';

export interface IGeoPoint {
  gid?: number
  name: string,
  point: Point
}

export interface IDoQuery {
  distance:number
  lat:number
  lng:number
}