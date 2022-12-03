import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOptionGroupDto {
  @ApiProperty()
  @IsString()
  name: string;
}
