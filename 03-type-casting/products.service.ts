import { Injectable } from 'yasui';


interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  categories: string[];
}

@Injectable()
export class ProductsService {

  private products: Product[] = [
    { id: 1, name: 'Laptop', price: 999.99, inStock: true, categories: ['electronics', 'computers'] },
    { id: 2, name: 'Coffee Mug', price: 12.50, inStock: true, categories: ['home', 'kitchen'] },
    { id: 3, name: 'Headphones', price: 149.99, inStock: false, categories: ['electronics', 'audio'] },
    { id: 4, name: 'Notebook', price: 5.99, inStock: true, categories: ['office', 'stationery'] },
    { id: 5, name: 'Keyboard', price: 79.99, inStock: true, categories: ['electronics', 'computers'] },
  ];

  search(options: {
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    categories?: string[];
    limit?: number;
  }): Product[] {
    let results = this.products;

    if (options.minPrice !== undefined) {
      results = results.filter(p => p.price >= options.minPrice!);
    }
    if (options.maxPrice !== undefined) {
      results = results.filter(p => p.price <= options.maxPrice!);
    }
    if (options.inStock !== undefined) {
      results = results.filter(p => p.inStock === options.inStock);
    }
    if (options.categories && options.categories.length > 0) {
      results = results.filter(p =>
        options.categories!.some(cat => p.categories.includes(cat))
      );
    }
    if (options.limit !== undefined) {
      results = results.slice(0, options.limit);
    }

    return results;
  }

  getById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }
}
