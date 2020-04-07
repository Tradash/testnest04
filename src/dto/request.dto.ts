import { IsNumber, IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostPointDto {
  @ApiProperty({ example: 'Точка №1', description: 'Имя точки' })
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty({ example: 45.4558, description: 'Широта точки' })
  @IsNumber()
  readonly lng: number;
  @ApiProperty({ example: 55.4558, description: 'Долгота точки' })
  @IsNumber()
  readonly lat: number;
}

export class PutPointDto extends PostPointDto {
  @ApiProperty({ example: 101, description: 'ID точки' })
  @IsNumber()
  readonly gid: number;
}

export class GetDoQueryDto {
  @IsNumberString()
  @ApiProperty({ example: 45.4558, description: 'Широта точки' })
  readonly lng: string;
  @IsNumberString()
  @ApiProperty({ example: 55.4558, description: 'Долгота точки' })
  readonly lat: string;
  @ApiProperty({ example: 120, description: 'Расстояние в метрах'})
  @IsNumberString()
  readonly distance: string;
}

export class GetPointDto {
  @ApiProperty({ example: 101, description: 'ID точки' })
  @IsNumberString()
  readonly id: string;
}
