import { Repository } from 'typeorm';
import { Injectable } from 'yasui';
import { Order } from '../entities/index.js';
import { InjectRepository } from './index.js';


@Injectable()
export class OrderRepository {

  constructor(
    @InjectRepository(Order)
    private readonly orders: Repository<Order>,
  ) { }


  findAll(): Promise<Order[]> {
    return this.orders.find({ order: { createdAt: 'DESC' } });
  }

  findById(id: number): Promise<Order | null> {
    return this.orders.findOne({ where: { id } });
  }

  create(data: Partial<Order>): Promise<Order> {
    const order = this.orders.create(data);
    return this.orders.save(order);
  }

  async updateStatus(id: number, status: string): Promise<Order | null> {
    await this.orders.update({ id }, { status });
    return this.findById(id);
  }
}
