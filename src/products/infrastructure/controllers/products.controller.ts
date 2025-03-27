import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Query, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '../../../auth/infrastructure/guards/auth.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { User } from '../../../auth/domain/entities/user.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { GetProductsUseCase } from '../../domain/use-cases/get-products.use-case';
import { CreateProductUseCase } from '../../domain/use-cases/create-product.use-case';
import { UpdateProductUseCase } from '../../domain/use-cases/update-product.use-case';
import { InactivateProductUseCase } from '../../domain/use-cases/inactivate-product.use-case';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProductDto } from '../dtos/product.dto';
import { PageOptionsDto } from '../dtos/page-options.dto';

@ApiTags('Products')
@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
    constructor(
        private readonly getProductsUseCase: GetProductsUseCase,
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly updateProductUseCase: UpdateProductUseCase,
        private readonly inactivateProductUseCase: InactivateProductUseCase,
    ) { }

    @Get()
    @ApiOperation({ summary: 'List products (with pagination)' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, type: [ProductDto], description: 'List of products' })
    async findAll(@Query() pageOptionsDto: PageOptionsDto) {
        const { page, limit } = pageOptionsDto;
        const { products, total } = await this.getProductsUseCase.execute(page, limit);
        return { data: products, total };
    }

    @Post()
    @ApiOperation({ summary: 'Create a new product (requires authentication)' })
    @ApiBearerAuth()
    @ApiResponse({ status: 201, type: ProductDto, description: 'Product created successfully' })
    @ApiBody({ type: CreateProductDto, description: 'Product data to create' })
    async create(@Body() createProductDto: CreateProductDto, @CurrentUser() user: User) {

        const product = await this.createProductUseCase.execute(createProductDto, user);
        return product;
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a product (only the owner, requires authentication)' })
    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: String, description: 'ID of the product to update' })
    @ApiResponse({ status: 200, type: ProductDto, description: 'Product updated successfully' })
    @ApiBody({ type: UpdateProductDto, description: 'Product data to update' })
    async update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
        @CurrentUser() user: User,
    ) {
        const updatedProduct = await this.updateProductUseCase.execute(id, updateProductDto, user);
        return updatedProduct;
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Inactivate a product (only the owner, requires authentication)' })
    @ApiBearerAuth()
    @ApiParam({ name: 'id', type: String, description: 'ID of the product to inactivate' })
    @ApiResponse({ status: 200, type: ProductDto, description: 'Product inactivated successfully' })
    async inactivate(@Param('id') id: string, @CurrentUser() user: User) {
        const inactivatedProduct = await this.inactivateProductUseCase.execute(id, user);
        return inactivatedProduct;
    }
}