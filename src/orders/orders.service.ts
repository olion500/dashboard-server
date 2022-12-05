import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { fullImagePath } from '../common/utils/image.utils';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(files: Express.Multer.File[], createOrderDto: CreateOrderDto) {
    const initOrder = new Order(createOrderDto);
    initOrder.images = files.map((f) => fullImagePath('orders', f.filename));

    initOrder.product = await this.productRepository.findOneBy({
      id: createOrderDto.product_id,
    });

    return await this.orderRepository.save(initOrder);
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
}
