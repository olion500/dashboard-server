import { Test, TestingModule } from '@nestjs/testing';
import { EstimateSheetsController } from './estimate_sheets.controller';
import { EstimateSheetsService } from './estimate_sheets.service';

describe('EstimateSheetsController', () => {
  let controller: EstimateSheetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstimateSheetsController],
      providers: [EstimateSheetsService],
    }).compile();

    controller = module.get<EstimateSheetsController>(EstimateSheetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
