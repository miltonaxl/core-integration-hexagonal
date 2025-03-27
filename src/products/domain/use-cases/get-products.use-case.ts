import { Injectable, Inject } from '@nestjs/common';
import { GetProductsUseCasePort } from '../ports/product.use-case.port';
import { ProductRepositoryPort } from '../ports/product.repository.port';
import { Product } from '../entities/product.entity';

@Injectable()
export class GetProductsUseCase implements GetProductsUseCasePort {
    constructor(
        @Inject('ProductRepositoryPort')
        private readonly productRepository: ProductRepositoryPort,
    ) { }

    async execute(page: number, limit: number): Promise<{ products: Product[]; total: number }> {
        return this.productRepository.findAll(page, limit);
    }
}
