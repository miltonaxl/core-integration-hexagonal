import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductRepositoryPort } from '../../domain/ports/product.repository.port';
import { Product } from '../../domain/entities/product.entity';
import { ProductDocument } from './product.schema';
import { User } from '../../../auth/domain/entities/user.entity';

@Injectable()
export class ProductMongodbAdapter implements ProductRepositoryPort {
    constructor(
        @InjectModel(ProductDocument.name) private readonly productModel: Model<ProductDocument>,
    ) { }

    async save(product: Product): Promise<Product> {
        const createdProduct = new this.productModel({
            ...product,
            owner: product.owner,
        });
        const savedProduct = await createdProduct.save();
        return this.mapToDomain(savedProduct);
    }

    async findAll(page: number, limit: number): Promise<{ products: Product[]; total: number }> {
        const skip = (page - 1) * limit;
        const [productsDocuments, total] = await Promise.all([
            this.productModel.find().skip(skip).limit(limit).populate('owner').exec(),
            this.productModel.countDocuments().exec(),
        ]);
        const products = productsDocuments.map((doc) => this.mapToDomain(doc));
        return { products, total };
    }

    async findById(id: string): Promise<Product | null> {
        const productDocument = await this.productModel.findById(id).populate('owner').exec();
        if (!productDocument) {
            return null;
        }
        return this.mapToDomain(productDocument);
    }

    async update(product: Product): Promise<Product> {
        const updatedDocument = await this.productModel.findByIdAndUpdate(
            product.id,
            { name: product.name, price: product.price },
            { new: true },
        ).exec();
        if (!updatedDocument) {
            throw new NotFoundException(`Product with ID ${product.id} not found`);
        }
        return this.mapToDomain(updatedDocument);
    }

    async inactivate(id: string): Promise<Product | null> {
        const inactivatedDocument = await this.productModel.findByIdAndUpdate(
            id,
            { status: 'inactive' },
            { new: true },
        ).exec();
        if (!inactivatedDocument) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return this.mapToDomain(inactivatedDocument);
    }

    private mapToDomain(document: ProductDocument): Product {
        const product = new Product();
        product.id = document.id;
        product.name = document.name;
        product.price = document.price;
        product.owner = { id: document.owner.toString() };
        product.status = document.status;
        product.creation_date = document.creation_date;
        product.validated = document.validated;
        return product;
    }
}