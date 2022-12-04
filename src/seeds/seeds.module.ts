import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { SeedsController } from './seeds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from '../options/entities/option.entity';
import { OptionGroup } from '../options/entities/option_group.entity';
import { Product } from '../products/entities/product.entity';
import { ProductOption } from '../products/entities/product_option.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Option, OptionGroup, Product, ProductOption]),
  ],
  controllers: [SeedsController],
  providers: [SeedsService],
})
export class SeedsModule {}
