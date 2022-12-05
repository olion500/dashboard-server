import { IsDate, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateEstimateSheetDto {
  @ApiProperty()
  @IsString()
  estimateNo: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  estimatedAt: Date;

  @ApiProperty()
  @IsString()
  companyName: string;

  @ApiProperty()
  @IsString()
  companyId: string;

  @ApiProperty()
  @IsString()
  companyCEO: string;

  @ApiProperty()
  @IsInt()
  totalCost: number;

  @ApiProperty()
  @IsString()
  url: string;
}
