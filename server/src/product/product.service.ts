import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../user/schemas/product.schema';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async create(data: Partial<Product>): Promise<Product> {
    return this.productModel.create(data);
  }

  async findAll(search?: string, minPrice?: string, maxPrice?: string): Promise<Product[]> {
    const filter: any = {};
  
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
  
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
  
    return this.productModel.find(filter).exec();
  }
  

  async update(id: string, data: Partial<Product>): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id);
  }
}
