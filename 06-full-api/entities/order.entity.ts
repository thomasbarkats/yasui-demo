import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity('orders')
export class Order {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'customer_email', length: 254 })
  customerEmail!: string;

  @Column({ type: 'simple-json' })
  items!: { productId: number; quantity: number }[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total!: number;

  @Column({ default: 'pending', length: 50 })
  status!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
