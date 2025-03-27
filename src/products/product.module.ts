import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './infrastructure/controllers/products.controller';
import { ProductSchema, ProductDocument } from './infrastructure/mongodb/product.schema';
import { ProductMongodbAdapter } from './infrastructure/mongodb/product.mongodb.adapter';
import { CreateProductUseCase } from './domain/use-cases/create-product.use-case';
import { GetProductsUseCase } from './domain/use-cases/get-products.use-case';
import { UpdateProductUseCase } from './domain/use-cases/update-product.use-case';
import { InactivateProductUseCase } from './domain/use-cases/inactivate-product.use-case';
import { CoreIntegrationAdapter } from './infrastructure/http/core-integration.adapter';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: ProductDocument.name, schema: ProductSchema }]),
        ConfigModule,
        AuthModule
    ],
    controllers: [ProductsController],
    providers: [
        CreateProductUseCase,
        GetProductsUseCase,
        UpdateProductUseCase,
        InactivateProductUseCase,
        ProductMongodbAdapter,
        CoreIntegrationAdapter,
        {
            provide: 'ProductRepositoryPort',
            useClass: ProductMongodbAdapter,
        },
        {
            provide: 'CoreIntegrationPort',
            useClass: CoreIntegrationAdapter,
        },
    ],
})
export class ProductsModule { }