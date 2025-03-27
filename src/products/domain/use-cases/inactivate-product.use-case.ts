import { Injectable, Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InactivateProductUseCasePort } from '../ports/product.use-case.port';
import { ProductRepositoryPort } from '../ports/product.repository.port';
import { User } from '../../../auth/domain/entities/user.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class InactivateProductUseCase implements InactivateProductUseCasePort {
    constructor(
        @Inject('ProductRepositoryPort')
        private readonly productRepository: ProductRepositoryPort,
    ) { }

    async execute(id: string, user: User): Promise<Product | null> {
        const product = await this.productRepository.findById(id);

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        if (typeof product.owner === 'object' && 'id' in product.owner && product.owner.id !== user.id) {
            throw new UnauthorizedException('You do not have permission to inactivate this product.');
        }

        return this.productRepository.inactivate(id);
    }
}
