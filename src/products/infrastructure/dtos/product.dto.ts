import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../auth/domain/entities/user.entity';

export class ProductDto {
    @ApiProperty({ description: 'Product ID', example: 'uuid-product' })
    id: string;

    @ApiProperty({ description: 'Product name', example: 'Laptop' })
    name: string;

    @ApiProperty({ description: 'Product price', example: 1200.00 })
    price: number;

    @ApiProperty({ description: 'Product owner', type: User })
    owner: User;

    @ApiProperty({ description: 'Product status', example: 'active' })
    status: 'active' | 'inactive';

    @ApiProperty({ description: 'Product creation date', example: '2024-03-26T14:00:00.000Z' })
    creation_date?: Date;

    @ApiProperty({ description: 'Indicates if the product was validated by the core system' })
    validated?: boolean;
}