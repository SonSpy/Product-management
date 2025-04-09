import { Model } from 'mongoose';
import { Product, ProductDocument } from '../user/schemas/product.schema';
export declare class ProductService {
    private productModel;
    constructor(productModel: Model<ProductDocument>);
    create(data: Partial<Product>): Promise<Product>;
    findAll(search?: string, minPrice?: string, maxPrice?: string): Promise<Product[]>;
    update(id: string, data: Partial<Product>): Promise<Product>;
    delete(id: string): Promise<Product>;
}
