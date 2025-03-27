import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ description: 'Product name', example: 'Laptop' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Product price', example: 1200.00 })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;
}