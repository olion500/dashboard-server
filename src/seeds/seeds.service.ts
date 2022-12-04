import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from '../options/entities/option.entity';
import { Repository } from 'typeorm';
import { OptionGroup } from '../options/entities/option_group.entity';
import { CreateOptionGroupDto } from '../options/dto/create-option-group-dto';
import { CreateOptionDto } from '../options/dto/create-option.dto';
import { Product } from '../products/entities/product.entity';
import { ProductOption } from '../products/entities/product_option.entity';

@Injectable()
export class SeedsService {
  constructor(
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
    @InjectRepository(OptionGroup)
    private optionGroupRepository: Repository<OptionGroup>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductOption)
    private productOptionRepository: Repository<ProductOption>,
  ) {}

  async create() {
    await this.clearDB();

    const fontColorGroup = await this.createOptionGroup({ name: '글자색상' });
    const fontGroup = await this.createOptionGroup({ name: '글씨체' });

    this.createOptions(fontColorGroup, [
      { name: '흰색' },
      { name: '빨강' },
      { name: '분홍' },
      { name: '살구' },
      { name: '파랑' },
      { name: '검정' },
      { name: '보라' },
      { name: '하늘' },
    ]);

    this.createOptions(fontGroup, [
      { name: '야놀자체' },
      { name: '도현체' },
      { name: '주아체' },
      { name: '손글씨체' },
    ]);

    return 'The seeding is completed';
  }

  async createOptionGroup(createOptionGroupDto: CreateOptionGroupDto) {
    const optionGroup = new OptionGroup(createOptionGroupDto);
    return this.optionGroupRepository.save(optionGroup);
  }

  async createOptions(
    optionGroup: OptionGroup,
    createOptionDtos: CreateOptionDto[],
  ) {
    const options = [];
    for (const createOptionDto of createOptionDtos) {
      const option = new Option(createOptionDto);
      await this.optionRepository.save(option);
      options.push(option);
    }
    optionGroup.options = options;
    return await this.optionGroupRepository.save(optionGroup);
  }

  async clearDB() {
    const repositories = [
      this.optionRepository,
      this.optionGroupRepository,
      this.productRepository,
      this.productOptionRepository,
    ];

    for (const repository of repositories) {
      await repository.query(`DELETE FROM ${repository.metadata.tableName}`);
    }
  }
}
