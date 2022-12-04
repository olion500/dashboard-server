import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductOption } from './entities/product_option.entity';
import { OptionsModule } from '../options/options.module';

@Module({
  imports: [OptionsModule, TypeOrmModule.forFeature([Product, ProductOption])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
