import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { fullImagePath } from '../common/utils/image.utils';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(files: Express.Multer.File[], createOrderDto: CreateOrderDto) {
    console.log(createOrderDto);
    const initOrder = new Order(createOrderDto);
    // initOrder.images = files.map((f) => fullImagePath('orders', f.filename));
    return await this.orderRepository.save(initOrder);
  }

  findAll() {
    return this.orderRepository.find();
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
