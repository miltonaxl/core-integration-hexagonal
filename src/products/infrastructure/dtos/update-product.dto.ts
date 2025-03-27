import { IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
    @ApiProperty({ description: 'New product name', example: 'New Laptop' })
    @IsOptional()
    name?: string;

    @ApiProperty({ description: 'New product price', example: 1300.00 })
    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;
}