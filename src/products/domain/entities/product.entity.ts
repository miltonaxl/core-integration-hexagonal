import { ObjectId } from 'mongoose';
import { User } from '../../../auth/domain/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Product {
    @ApiProperty({ description: 'Product ID', example: 'uuid-product' })
    id?: string;

    @ApiProperty({ description: 'Product name', example: 'Laptop' })
    name: string;

    @ApiProperty({ description: 'Product price', example: 1200.00 })
    price: number;

    @ApiProperty({ description: 'Owner of the product', type: User })
    owner: string | ObjectId | { id: string };

    @ApiProperty({ description: 'Product status', example: 'active' })
    status: 'active' | 'inactive';

    @ApiProperty({ description: 'Creation date of the product', example: '2024-03-26T14:00:00.000Z' })
    creation_date?: Date;

    @ApiProperty({ description: 'Indicates if the product was validated by the core system', example: true })
    validated?: boolean;
}