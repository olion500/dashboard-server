import { PartialType } from '@nestjs/mapped-types';
import { CreateOptionDto } from './create-option.dto';
import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOptionDto extends PartialType(CreateOptionDto) {
  @ApiProperty()
  @IsInt()
  count: number;
}
