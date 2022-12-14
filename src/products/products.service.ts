import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { fullImagePath } from '../common/utils/image.utils';
import { ProductOption } from './entities/product_option.entity';
import { OptionsService } from '../options/options.service';
import { UpdateProductOptionDto } from './dto/update-product-option.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductOption)
    private productOptionRepository: Repository<ProductOption>,
    private readonly optionsService: OptionsService,
  ) {}

  async create(file: Express.Multer.File, createProductDto: CreateProductDto) {
    const data = new Product(createProductDto);
    data.image = fullImagePath('products', file.filename);
    const product = await this.productRepository.save(data);

    const options = [
      await this.optionsService.findOneGroup(createProductDto.option1),
      await this.optionsService.findOneGroup(createProductDto.option2),
      await this.optionsService.findFontGroup(),
      await this.optionsService.findFontColorGroup(),
    ];

    for (const option of options) {
      const productOption = new ProductOption();
      productOption.product = product;
      productOption.option = option;
      this.productOptionRepository.save(productOption);
    }

    return product;
  }

  findAll() {
    return this.productRepository.find();
    // return this.productRepository
    //   .createQueryBuilder('product')
    //   .leftJoinAndSelect('product.productOptions', 'productOptions')
    //   .leftJoinAndSelect('productOptions.option', 'optionGroup')
    //   .leftJoinAndSelect('optionGroup.options', 'options')
    //   .getMany();
  }

  findOne(id: number) {
    return this.productRepository
      .createQueryBuilder('product')
      .where({ id })
      .leftJoinAndSelect('product.productOptions', 'productOptions')
      .leftJoinAndSelect('productOptions.option', 'optionGroup')
      .leftJoinAndSelect('optionGroup.options', 'options')
      .orderBy('optionGroup.id', 'DESC')
      .getOne();
  }

  async findProductOption(
    productId: number,
    optionId: number,
  ): Promise<ProductOption> {
    const product = await this.findOne(productId);
    const option = await this.optionsService.findOptionGroupByOption(optionId);
    return await this.productOptionRepository.findOne({
      where: {
        option: { id: option.id },
        product: { id: product.id },
      },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  updateProductOption(
    poid: number,
    updateProductOptionDto: UpdateProductOptionDto,
  ) {
    return this.productOptionRepository.update(poid, updateProductOptionDto);
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }
}
