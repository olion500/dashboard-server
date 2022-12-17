import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../common/utils/image.utils';
import { UpdateProductOptionDto } from './dto/update-product-option.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions('products')))
  create(
    @UploadedFile(new ValidationPipe()) file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(file, createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @Patch('/options/:id')
  updateProductOption(
    @Param('id') id: string,
    @Body() updateProductOptionDto: UpdateProductOptionDto,
  ) {
    return this.productsService.updateProductOption(
      +id,
      updateProductOptionDto,
    );
  }
}
