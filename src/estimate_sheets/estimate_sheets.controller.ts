import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EstimateSheetsService } from './estimate_sheets.service';
import { CreateEstimateSheetDto } from './dto/create-estimate_sheet.dto';
import { UpdateEstimateSheetDto } from './dto/update-estimate_sheet.dto';

@Controller('estimate-sheets')
export class EstimateSheetsController {
  constructor(private readonly estimateSheetsService: EstimateSheetsService) {}

  @Post()
  create(@Body() createEstimateSheetDto: CreateEstimateSheetDto) {
    return this.estimateSheetsService.create(createEstimateSheetDto);
  }

  @Get()
  findAll() {
    return this.estimateSheetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estimateSheetsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstimateSheetDto: UpdateEstimateSheetDto,
  ) {
    return this.estimateSheetsService.update(+id, updateEstimateSheetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estimateSheetsService.remove(+id);
  }
}
