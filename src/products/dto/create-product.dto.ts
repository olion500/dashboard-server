import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  option1: number;

  @ApiProperty()
  option2: number;

  @ApiProperty()
  @IsString()
  designType: string;

  @ApiProperty()
  @IsString()
  productType: string;
}
