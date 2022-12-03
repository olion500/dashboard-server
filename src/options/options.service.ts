import { Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { Repository } from 'typeorm';
import { Option } from './entities/option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OptionGroup } from './entities/option_group.entity';
import { CreateOptionGroupDto } from './dto/create-option-group-dto';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
    @InjectRepository(OptionGroup)
    private optionGroupRepository: Repository<OptionGroup>,
  ) {}

  async createGroup(createOptionGroupDto: CreateOptionGroupDto) {
    const data = new OptionGroup(createOptionGroupDto);
    return await this.optionGroupRepository.save(data);
  }

  async create(optionGroupId: number, createOptionDto: CreateOptionDto) {
    const option = new Option(createOptionDto);
    await this.optionRepository.save(option);

    const optionGroup = await this.findOneGroup(optionGroupId);
    optionGroup.options.push(option);

    return await this.optionGroupRepository.save(optionGroup);
  }

  findAllGroup() {
    return this.optionGroupRepository.find({
      relations: { options: true },
    });
  }

  findOneGroup(optionGroupId: number) {
    return this.optionGroupRepository.findOne({
      where: { id: optionGroupId },
      relations: { options: true },
    });
  }

  update(id: number, updateOptionDto: UpdateOptionDto) {
    return this.optionRepository.update(id, updateOptionDto);
  }

  remove(id: number) {
    return this.optionRepository.delete(id);
  }

  removeGroup(id: number) {
    return this.optionGroupRepository.delete(id);
  }
}
