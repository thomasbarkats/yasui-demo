import { Controller, Get, Param, Query, HttpError } from 'yasui';
import { ProductsService } from './products.service.js';


@Controller('/api/products')
export class ProductsController {

  constructor(
    private productsService: ProductsService
  ) { }


  /**
   * Demonstrates automatic type casting:
   * - minPrice/maxPrice: string -> number
   * - inStock: string "true"/"false" -> boolean
   * - categories: string -> string[] (comma-separated)
   * - limit: string -> number
   *
   * Try: GET /api/products?minPrice=50&maxPrice=200&inStock=true&limit=5
   * Try: GET /api/products?categories=electronics,audio
   */
  @Get('/')
  search(
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('inStock') inStock?: boolean,
    @Query('categories', [String]) categories?: string[],
    @Query('limit') limit?: number,
  ) {
    return {
      // Show what was received (already typed!)
      filters: {
        minPrice: { value: minPrice, type: typeof minPrice },
        maxPrice: { value: maxPrice, type: typeof maxPrice },
        inStock: { value: inStock, type: typeof inStock },
        categories: { value: categories, isArray: Array.isArray(categories) },
        limit: { value: limit, type: typeof limit },
      },
      results: this.productsService.search({
        minPrice,
        maxPrice,
        inStock,
        categories,
        limit,
      }),
    };
  }


  /**
   * id is automatically converted to number
   * Try: GET /api/products/1
   */
  @Get('/:id')
  getById(@Param('id') id: number) {
    console.log(`Received id: ${id} (type: ${typeof id})`);

    const product = this.productsService.getById(id);
    if (!product) {
      throw new HttpError(404, 'Product not found');
    }
    return product;
  }
}
