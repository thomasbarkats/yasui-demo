import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpStatus,
  HttpError,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiErrorResponse,
} from 'yasui';
import { ProductRepository } from '../repositories/index.js';
import { CreateProductDto, UpdateProductDto, ProductDto, MessageResponseDto } from '../dtos/index.js';


@Controller('/api/products')
export class ProductsController {

  constructor(
    private productRepository: ProductRepository
  ) { }

  @ApiOperation('List products', 'Returns all available products')
  @ApiResponse(200, 'Product list', [ProductDto])

  @Get('/')
  getAll() {
    return this.productRepository.findAll();
  }


  @ApiOperation('Get product', 'Returns a product by ID')
  @ApiParam('id', 'Product ID', true, Number)
  @ApiResponse(200, ProductDto)
  @ApiErrorResponse(404, 'Product not found')

  @Get('/:id')
  async getById(@Param('id') id: number) {
    if (Number.isNaN(id)) {
      throw new HttpError(400, 'Product ID must be a number');
    }
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new HttpError(404, 'Product not found');
    }
    return product;
  }


  @ApiOperation('Create product', 'Creates a new product')
  @ApiBody(CreateProductDto)
  @ApiResponse(201, ProductDto)
  @ApiErrorResponse(400, 'Validation failed')

  @Post('/')
  @HttpStatus(201)
  create(@Body() data: CreateProductDto) {
    return this.productRepository.create(data);
  }


  @ApiOperation('Update product', 'Updates a product by ID')
  @ApiParam('id', 'Product ID', true, Number)
  @ApiBody(UpdateProductDto)
  @ApiResponse(200, ProductDto)
  @ApiErrorResponse(404, 'Product not found')

  @Patch('/:id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateProductDto
  ) {
    const product = await this.productRepository.update(id, data);
    if (!product) {
      throw new HttpError(404, 'Product not found');
    }
    return product;
  }


  @ApiOperation('Delete product', 'Deletes a product by ID')
  @ApiParam('id', 'Product ID', true, Number)
  @ApiResponse(200, MessageResponseDto)
  @ApiErrorResponse(404, 'Product not found')

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    const deleted = await this.productRepository.delete(id);
    if (!deleted) {
      throw new HttpError(404, 'Product not found');
    }
    return { message: 'Product deleted successfully' };
  }
}
