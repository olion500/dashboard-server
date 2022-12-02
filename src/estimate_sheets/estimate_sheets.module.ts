import { Module } from '@nestjs/common';
import { EstimateSheetsService } from './estimate_sheets.service';
import { EstimateSheetsController } from './estimate_sheets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstimateSheet } from './entities/estimate_sheet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstimateSheet])],
  controllers: [EstimateSheetsController],
  providers: [EstimateSheetsService],
})
export class EstimateSheetsModule {}
