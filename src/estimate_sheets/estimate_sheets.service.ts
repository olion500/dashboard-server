import { Injectable } from '@nestjs/common';
import { CreateEstimateSheetDto } from './dto/create-estimate_sheet.dto';
import { UpdateEstimateSheetDto } from './dto/update-estimate_sheet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EstimateSheet } from './entities/estimate_sheet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstimateSheetsService {
  constructor(
    @InjectRepository(EstimateSheet)
    private estimateSheetRepository: Repository<EstimateSheet>,
  ) {}

  async create(createEstimateSheetDto: CreateEstimateSheetDto) {
    const data = new EstimateSheet(createEstimateSheetDto);
    return await this.estimateSheetRepository.save(data);
  }

  findAll() {
    return this.estimateSheetRepository.find();
  }

  findOne(id: number) {
    return this.estimateSheetRepository.findOneBy({ id });
  }

  update(id: number, updateEstimateSheetDto: UpdateEstimateSheetDto) {
    return this.estimateSheetRepository.update(id, updateEstimateSheetDto);
  }

  remove(id: number) {
    return this.estimateSheetRepository.delete(id);
  }
}
