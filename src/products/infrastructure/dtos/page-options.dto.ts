import { IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PageOptionsDto {
    @ApiProperty({
        default: 1,
        description: 'Page number',
        required: false
    })
    @IsOptional()
    page?: number = 1;

    @ApiProperty({
        default: 10,
        description: 'Number of items per page',
        required: false

    })
    @IsOptional()
    limit?: number = 10;
}