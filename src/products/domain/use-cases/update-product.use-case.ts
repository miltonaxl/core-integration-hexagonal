import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateProductUseCasePort } from '../ports/product.use-case.port';
import { ProductRepositoryPort } from '../ports/product.repository.port';
import { User } from '../../../auth/domain/entities/user.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class UpdateProductUseCase implements UpdateProductUseCasePort {
    constructor(@Inject('ProductRepositoryPort')
    private readonly productRepository: ProductRepositoryPort,) { }

    async execute(id: string, updateProductDto: { name?: string; price?: number }, user: User): Promise<Product> {
        const product = await this.productRepository.findById(id);

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        console.log(" USER ", user, " \n PRODUT OWNER ", typeof product.owner === 'object' && 'id' in product.owner ? product.owner.id : product.owner)

        if (typeof product.owner === 'object' && 'id' in product.owner && product.owner.id !== user.id) {
            throw new UnauthorizedException('You do not have permission to edit this product.');
        }

        if (updateProductDto.name) {
            product.name = updateProductDto.name;
        }
        if (updateProductDto.price !== undefined) {
            product.price = updateProductDto.price;
        }

        console.log(" WIFI PASSED HERE ")

        return this.productRepository.update(product);
    }
}