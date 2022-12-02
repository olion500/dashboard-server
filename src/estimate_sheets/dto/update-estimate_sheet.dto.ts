import { PartialType } from '@nestjs/mapped-types';
import { CreateEstimateSheetDto } from './create-estimate_sheet.dto';

export class UpdateEstimateSheetDto extends PartialType(
  CreateEstimateSheetDto,
) {}
