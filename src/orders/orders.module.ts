import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { OptionConsumeHistory } from 'src/options/entities/option_consume_history.entity';
import { OptionsModule } from 'src/options/options.module';

@Module({
  imports: [OptionsModule, TypeOrmModule.forFeature([Order, Product, OptionConsumeHistory])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
