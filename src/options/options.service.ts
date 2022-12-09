import { Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { Repository } from 'typeorm';
import { Option } from './entities/option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OptionGroup } from './entities/option_group.entity';
import { CreateOptionGroupDto } from './dto/create-option-group-dto';
import { fullImagePath } from '../common/utils/image.utils';
import { OptionConsumeHistory } from './entities/option_consume_history.entity';
import { OptionsStockDto, OptionStockInfo } from './dto/consume-option.dto';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
    @InjectRepository(OptionGroup)
    private optionGroupRepository: Repository<OptionGroup>,
    @InjectRepository(OptionConsumeHistory)
    private optionConsumeHistoryRepository: Repository<OptionConsumeHistory>,
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

  findOne(optionId: number) {
    return this.optionRepository.findOne({
      where: { id: optionId },
      relations: [
        'optionGroup',
        'optionGroup.productOptions',
        'optionGroup.productOptions.product',
      ],
    });
  }

  findAll() {
    return this.optionRepository.find({
      relations: [
        'optionGroup',
        'optionGroup.productOptions',
        'optionGroup.productOptions.product',
      ],
    });
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


  async getOptionsStock() {
    const optionsStock: OptionsStockDto = new OptionsStockDto();

    const options = await this.findAll();
    options.map((option) =>
      optionsStock.options.push(
        new OptionStockInfo({
          id: option.id,
          groupName: option.optionGroup.name,
          name: option.name,
          count: option.count,
          createdAt: option.createdAt,
        }),
      ),
    );

    const consumes = new Map<number, number>();
    const consumeHistories = await this.optionConsumeHistoryRepository.find();

    consumeHistories.map((history) => {
      consumes.has(history.optionId)
        ? consumes.set(
            history.optionId,
            consumes.get(history.optionId) + history.consume,
          )
        : consumes.set(history.optionId, history.consume);
    });

    const getDayDiff = (d1: Date, d2: Date) => {
      const diff = Math.abs(d1.getTime() - d2.getTime());

      return diff / (1000 * 60 * 60 * 24);
    };

    optionsStock.options.map((option) => {
      if (consumes.has(option.id)) {
        const postOptionCreationPeriod = getDayDiff(
          new Date(),
          option.createdAt,
        );
        option.dailyConsume = Number(
          (consumes.get(option.id) / postOptionCreationPeriod).toFixed(1),
        );

        option.estimatedSoldOut = Number(
          (option.count / option.dailyConsume).toFixed(1),
        );
        option.warningLevel =
          option.count < 20
            ? '재고경고'
            : option.count < 40
            ? '재고부족'
            : '여유';
      }
    });

    return optionsStock;
  }
}
