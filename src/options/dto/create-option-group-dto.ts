import { IsInt, IsString } from 'class-validator';

export class CreateOptionGroupDto {
  @IsString()
  name: string;
}
