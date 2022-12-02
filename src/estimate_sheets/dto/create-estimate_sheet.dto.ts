import { IsDate, IsInt, IsString } from 'class-validator';

export class CreateEstimateSheetDto {
  @IsString()
  estimateNo: string;

  @IsString()
  name: string;

  @IsDate()
  estimatedAt: Date;

  @IsString()
  companyName: string;

  @IsString()
  companyId: string;

  @IsString()
  companyCEO: string;

  @IsInt()
  totalCost: number;

  @IsString()
  url: string;
}
