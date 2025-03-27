import { Product } from '../entities/product.entity';

export interface ProductRepositoryPort {
    save(product: Product): Promise<Product>;
    findAll(page: number, limit: number): Promise<{ products: Product[]; total: number }>;
    findById(id: string): Promise<Product | null>;
    update(product: Product): Promise<Product>;
    inactivate(id: string): Promise<Product | null>;
}