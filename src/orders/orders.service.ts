import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { fullImagePath } from '../common/utils/image.utils';
import { OptionConsumeHistory } from './entities/option_consume_history.entity';
import { ProductsService } from '../products/products.service';
import { OptionsService } from '../options/options.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OptionConsumeHistory)
    private optionConsumeHistoryRepository: Repository<OptionConsumeHistory>,
    private readonly productService: ProductsService,
    private readonly optionService: OptionsService,
  ) {}

  async create(files: Express.Multer.File[], createOrderDto: CreateOrderDto) {
    const product = await this.productService.findOne(
      createOrderDto.product_id,
    );
    const options = await this.optionService.findManyOption(
      createOrderDto.options,
    );

    // create order
    const initOrder = new Order(createOrderDto);
    initOrder.images = files.map((f) => fullImagePath('orders', f.filename));
    initOrder.product = product;
    const createOrderResult = await this.orderRepository.save(initOrder);

    // for all options selected by the order
    for (const option of options) {
      const productOption = await this.productService.findProductOption(
        product.id,
        option.id,
      );

      // create option consume history
      const initOptionConsumeHistory = new OptionConsumeHistory({
        product,
        option,
        consume: productOption.consume,
      });
      this.optionConsumeHistoryRepository.save(initOptionConsumeHistory);
    }

    return createOrderResult;
  }

  findAll() {
    return this.orderRepository.find({
      relations: {
        product: true,
      },
    });
  }

  findOne(id: number) {
    return this.orderRepository.findOneBy({ id });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.update(id, updateOrderDto);
  }

  remove(id: number) {
    return this.orderRepository.delete(id);
  }

  complete(id: number) {
    return this.orderRepository.update(id, {
      status: 'completed',
      completedAt: new Date(),
    });
  }

  async getRotateRate() {
    const orders = await this.orderRepository
      .createQueryBuilder('order')
      .where('order.completedAt is NOT null')
      .leftJoinAndSelect('order.product', 'products')
      .getMany();

    const averageMap = new Map<number, any>();
    for (const order of orders) {
      const key = order.product.id;

      if (!averageMap.has(key)) {
        averageMap.set(key, {
          name: order.product.name,
          sum: 0,
          count: 0,
        });
      }

      const avg = averageMap.get(key);
      avg.sum += this.getDayDiff(
        new Date(order.completedAt),
        new Date(order.createdAt),
      );
      avg.count += 1;
    }

    const result = [];
    for (const [key, value] of averageMap.entries()) {
      result.push({
        name: value.name,
        days: value.sum / value.count,
      });
    }

    return result;
  }

  getDayDiff(startDate: Date, endDate: Date): number {
    const msInDay = 24 * 60 * 60 * 1000;

    return Math.round(Math.abs(Number(endDate) - Number(startDate)) / msInDay);
  }

  async getStocks() {
    const options = await this.optionService.findAll();
    const optionConsumeHistory = await this.optionConsumeHistoryRepository
      .createQueryBuilder('och')
      .leftJoinAndSelect('och.option', 'option')
      .select('SUM(och.consume)', 'sum')
      .addSelect('option.id', 'optionId')
      .groupBy('option.id')
      .getRawMany();

    return options.map((option) => {
      let dailyConsumeAvg = 0;
      let expectedFinalConsume = 0;

      // 일평균소진
      for (const och of optionConsumeHistory) {
        if (och.optionId === option.id) {
          const days = this.getDayDiff(new Date(option.createdAt), new Date());
          if (days !== 0) {
            dailyConsumeAvg = Number(och.sum) / days;
            dailyConsumeAvg = Math.trunc(dailyConsumeAvg);
          }
        }
      }

      // 소진예상일
      if (dailyConsumeAvg !== 0) {
        expectedFinalConsume = Number(option.count) / dailyConsumeAvg;
      }

      return {
        ...option,
        dailyConsumeAvg,
        expectedFinalConsume,
      };
    });
  }
}
