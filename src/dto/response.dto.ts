import { IsNumber, IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MsgResponse {
  @ApiProperty({ example: 0, description: 'Код результата операции, 0 - успешно' })
  readonly code: number;
  @ApiProperty({ example: "Операция выполнена", description: 'Текстовое описание результата операции' })
  readonly message?: string;

}
