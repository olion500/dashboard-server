import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  purchase_site: string;

  @ApiProperty()
  product_id: number;

  @ApiProperty()
  @IsArray()
  options: number[];
}
