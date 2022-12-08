import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { fullImagePath } from '../common/utils/image.utils';
import { Product } from '../products/entities/product.entity';
import { OptionConsumeHistory } from 'src/options/entities/option_consume_history.entity';
import { OptionsService } from 'src/options/options.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(OptionConsumeHistory)
    private readonly optionConsumeHistoryRepository: Repository<OptionConsumeHistory>,
    private readonly optionsService: OptionsService,
  ) {}

  async create(files: Express.Multer.File[], createOrderDto: CreateOrderDto) {
    const initOrder = new Order(createOrderDto);
    initOrder.images = files.map((f) => fullImagePath('orders', f.filename));

    initOrder.product = await this.productRepository.findOneBy({
      id: createOrderDto.product_id,
    });
    const result = await this.orderRepository.save(initOrder);

    // Create OptionConsumeHistory
    const options = await Promise.all(
      initOrder.options.map((optionId) => {
        return this.optionsService.findOne(optionId);
      })
    );

    const productId = initOrder.product.id
    await Promise.all(
      options.map((option) => {
        const consume = option.optionGroup.productOptions.filter((productOption) => productOption.product.id === productId)[0].consume;

        const initOptionConsumeHistory = new OptionConsumeHistory({
          productId: productId,
          optionId: option.id,
          consume: consume
        });
        this.optionConsumeHistoryRepository.save(initOptionConsumeHistory);
      })
    )

    return result;
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
}
