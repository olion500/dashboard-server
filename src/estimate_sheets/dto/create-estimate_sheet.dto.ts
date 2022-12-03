import { IsDate, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEstimateSheetDto {
  @ApiProperty()
  @IsString()
  estimateNo: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDate()
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
