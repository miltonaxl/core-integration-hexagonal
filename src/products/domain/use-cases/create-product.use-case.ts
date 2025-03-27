import { Injectable, Inject } from '@nestjs/common';
import { CreateProductUseCasePort } from '../ports/product.use-case.port';
import { ProductRepositoryPort } from '../ports/product.repository.port';
import { CoreIntegrationPort } from '../ports/core-integration.port';
import { Product } from '../entities/product.entity';
import { User } from '../../../auth/domain/entities/user.entity';

@Injectable()
export class CreateProductUseCase implements CreateProductUseCasePort {
    constructor(
        @Inject('ProductRepositoryPort')
        private readonly productRepository: ProductRepositoryPort,

        @Inject('CoreIntegrationPort')
        private readonly coreIntegration: CoreIntegrationPort,
    ) { }

    async execute(createProductDto: { name: string; price: number }, user: User): Promise<Product> {
        const newProduct = new Product();
        newProduct.name = createProductDto.name;
        newProduct.price = createProductDto.price;
        newProduct.owner = user.id
        newProduct.status = 'active';
        newProduct.creation_date = new Date();

        newProduct.validated = await this.coreIntegration.validateProduct({
            name: newProduct.name,
            price: newProduct.price,
        });

        return this.productRepository.save(newProduct);
    }
}
