import { Product } from '../entities/product.entity';
import { User } from '../../../auth/domain/entities/user.entity';

export interface CreateProductUseCasePort {
    execute(createProductDto: { name: string; price: number }, user: User): Promise<Product>;
}

export interface GetProductsUseCasePort {
    execute(page: number, limit: number): Promise<{ products: Product[]; total: number }>;
}

export interface UpdateProductUseCasePort {
    execute(id: string, updateProductDto: { name?: string; price?: number }, user: User): Promise<Product>;
}

export interface InactivateProductUseCasePort {
    execute(id: string, user: User): Promise<Product | null>;
}