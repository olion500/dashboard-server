import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ValidationPipe,
} from '@nestjs/common';
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { CreateOptionGroupDto } from './dto/create-option-group-dto';
import { multerOptions } from '../common/utils/image.utils';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post()
  create(@Body() createOptionGroupDto: CreateOptionGroupDto) {
    return this.optionsService.createGroup(createOptionGroupDto);
  }

  @Post(':id')
  @UseInterceptors(FileInterceptor('image', multerOptions('options')))
  createOption(
    @Param('id') id: string,
    @UploadedFile(new ValidationPipe()) file: Express.Multer.File,
    @Body() createOptionDto: CreateOptionDto,
  ) {
    return this.optionsService.create(+id, file, createOptionDto);
  }

  @Get()
  findAll() {
    return this.optionsService.findAllGroup();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionsService.findOneGroup(+id);
  }

  @Get('stock')
  getOptionsStock() {
    // 여기서부터 오류 invalid input syntax for type integer: "NaN"
    return this.optionsService.getOptionsStock();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOptionDto: UpdateOptionDto) {
    return this.optionsService.update(+id, updateOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.optionsService.remove(+id);
  }
}
