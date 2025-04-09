import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '../user/schemas/product.schema';
import { Query } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() data: Partial<Product>) {
    return this.productService.create(data);
  }

  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
  ) {
    return this.productService.findAll(search, minPrice, maxPrice);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Product>) {
    return this.productService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
