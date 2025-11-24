import {
  Controller,
  Get,
  Post,
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
import { OrderRepository, ProductRepository } from '../repositories/index.js';
import { CreateOrderDto, OrderDto } from '../dtos/index.js';


@Controller('/api/orders')
export class OrdersController {

  constructor(
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository,
  ) { }


  @ApiOperation('List orders', 'Returns all orders')
  @ApiResponse(200, 'Order list', [OrderDto])

  @Get('/')
  getAll() {
    return this.orderRepository.findAll();
  }


  @ApiOperation('Get order', 'Returns an order by ID')
  @ApiParam('id', 'Order ID', true, Number)
  @ApiResponse(200, OrderDto)
  @ApiErrorResponse(404, 'Order not found')

  @Get('/:id')
  async getById(@Param('id') id: number) {
    if (Number.isNaN(id)) {
      throw new HttpError(400, 'Order ID must be a number');
    }
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new HttpError(404, 'Order not found');
    }
    return order;
  }


  @ApiOperation('Create order', 'Creates a new order')
  @ApiBody(CreateOrderDto)
  @ApiResponse(201, OrderDto)
  @ApiErrorResponse(400, 'Validation failed or insufficient stock')

  @Post('/')
  @HttpStatus(201)
  async create(@Body() data: CreateOrderDto) {
    let total = 0;

    // Validate products and calculate total
    for (const item of data.items) {
      const product = await this.productRepository.findById(item.productId);
      if (!product) {
        throw new HttpError(400, 'Product ' + item.productId + ' not found');
      }
      if (product.stock < item.quantity) {
        throw new HttpError(400, 'Insufficient stock for ' + product.name);
      }
      total += Number(product.price) * item.quantity;
    }

    // Update stock
    for (const item of data.items) {
      await this.productRepository.updateStock(item.productId, item.quantity);
    }

    // Create order
    return this.orderRepository.create({
      customerEmail: data.customerEmail,
      items: data.items,
      total: Math.round(total * 100) / 100,
      status: 'pending',
    });
  }
}
