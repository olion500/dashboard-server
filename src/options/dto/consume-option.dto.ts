import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class OptionsStockDto {
  @ApiProperty()
  options: OptionStockInfo[];
}

export class OptionStockInfo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsString()
  groupName: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  count: number;

  @ApiProperty()
  dailyConsume: number;

  @ApiProperty()
  estimatedSoldOut: number;

  @ApiProperty()
  @IsString()
  warningLevel: string;

  @ApiProperty()
  createdAt: Date;

  constructor(partial: Partial<OptionStockInfo>) {
    Object.assign(this, partial);
    this.dailyConsume = 0;
    this.estimatedSoldOut = 0;
    this.warningLevel = '여유';
  }
}
