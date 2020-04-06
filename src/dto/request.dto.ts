import { IsNumber, IsNotEmpty, IsNumberString } from 'class-validator';

export class PostPoint {
  @IsNotEmpty()
  name: string;
  @IsNumber()
  lng: number;
  @IsNumber()
  lat: number;
}

export class PutPoint extends PostPoint {
  @IsNumber()
  gid: number;
}

export class GetDoQuery {
  @IsNumberString()
  lng: string;
  @IsNumberString()
  lat: string;
  @IsNumberString()
  distance: string;
}

export class GetPoint {
  @IsNumberString()
  id: string;
}
