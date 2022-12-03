import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { CreateOptionGroupDto } from './dto/create-option-group-dto';

@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post()
  create(@Body() createOptionGroupDto: CreateOptionGroupDto) {
    return this.optionsService.createGroup(createOptionGroupDto);
  }

  @Post(':id')
  createOption(
    @Param('id') id: string,
    @Body() createOptionDto: CreateOptionDto,
  ) {
    return this.optionsService.create(+id, createOptionDto);
  }

  @Get()
  findAll() {
    return this.optionsService.findAllGroup();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionsService.findOneGroup(+id);
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
