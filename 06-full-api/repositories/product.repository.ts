import { Repository } from 'typeorm';
import { Injectable } from 'yasui';
import { Product } from '../entities/index.js';
import { InjectRepository } from './index.js';


@Injectable()
export class ProductRepository {

  constructor(
    @InjectRepository(Product)
    private readonly products: Repository<Product>,
  ) { }


  findAll(): Promise<Product[]> {
    return this.products.find();
  }

  findById(id: number): Promise<Product | null> {
    return this.products.findOne({ where: { id } });
  }

  create(data: Partial<Product>): Promise<Product> {
    const product = this.products.create(data);
    return this.products.save(product);
  }

  async update(id: number, data: Partial<Product>): Promise<Product | null> {
    await this.products.update({ id }, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.products.delete({ id });
    return (result.affected ?? 0) > 0;
  }

  async updateStock(id: number, quantity: number): Promise<boolean> {
    const product = await this.findById(id);
    if (!product || product.stock < quantity) return false;
    await this.products.update({ id }, { stock: product.stock - quantity });
    return true;
  }
}
