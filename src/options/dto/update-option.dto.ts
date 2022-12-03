import { PartialType } from '@nestjs/mapped-types';
import { CreateOptionDto } from './create-option.dto';
import { IsInt } from 'class-validator';

export class UpdateOptionDto extends PartialType(CreateOptionDto) {
  @IsInt()
  count: number;
}
