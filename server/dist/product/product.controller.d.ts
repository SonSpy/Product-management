import { ProductService } from './product.service';
import { Product } from '../user/schemas/product.schema';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(data: Partial<Product>): Promise<Product>;
    findAll(search?: string, minPrice?: string, maxPrice?: string): Promise<Product[]>;
    update(id: string, data: Partial<Product>): Promise<Product>;
    delete(id: string): Promise<Product>;
}
