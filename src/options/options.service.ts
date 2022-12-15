import { Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { Repository } from 'typeorm';
import { Option } from './entities/option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OptionGroup } from './entities/option_group.entity';
import { CreateOptionGroupDto } from './dto/create-option-group-dto';
import { fullImagePath } from '../common/utils/image.utils';
import { ProductOption } from '../products/entities/product_option.entity';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
    @InjectRepository(OptionGroup)
    private optionGroupRepository: Repository<OptionGroup>,
    @InjectRepository(ProductOption)
    private readonly productOptionRepository: Repository<ProductOption>,
  ) {}

  async createGroup(createOptionGroupDto: CreateOptionGroupDto) {
    const data = new OptionGroup(createOptionGroupDto);
    return await this.optionGroupRepository.save(data);
  }

  async create(
    optionGroupId: number,
    file: Express.Multer.File,
    createOptionDto: CreateOptionDto,
  ) {
    const option = new Option(createOptionDto);
    option.image = fullImagePath('options', file.filename);
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

  findManyOption(optionIdList: number[]): Promise<Option[]> {
    return Promise.all(
      optionIdList.map((optionId) => {
        return this.optionRepository.findOne({
          where: { id: optionId },
          relations: { optionGroup: true },
        });
      }),
    );
  }

  findOptionGroupByOption(optionId: number): Promise<OptionGroup> {
    return this.optionRepository
      .findOne({
        where: { id: optionId },
        relations: { optionGroup: true },
      })
      .then((option) => option.optionGroup);
  }

  findFontColorGroup() {
    return this.optionGroupRepository.findOneBy({ name: '글자색상' });
  }

  findFontGroup() {
    return this.optionGroupRepository.findOneBy({ name: '글씨체' });
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
