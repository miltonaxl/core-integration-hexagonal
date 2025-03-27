import { Injectable } from '@nestjs/common';
import { CoreIntegrationPort } from '../../domain/ports/core-integration.port';

@Injectable()
export class CoreIntegrationAdapter implements CoreIntegrationPort {
    async validateProduct(product: { name: string; price: number }): Promise<boolean> {

        console.log(`Simulating core integration validation for product: ${product.name} - ${product.price}`);

        return product.price > 10;
    }
}