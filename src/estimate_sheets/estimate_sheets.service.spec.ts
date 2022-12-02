import { Test, TestingModule } from '@nestjs/testing';
import { EstimateSheetsService } from './estimate_sheets.service';

describe('EstimateSheetsService', () => {
  let service: EstimateSheetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstimateSheetsService],
    }).compile();

    service = module.get<EstimateSheetsService>(EstimateSheetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
