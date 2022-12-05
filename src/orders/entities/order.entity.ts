import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  purchase_site: string;

  @Column('text', { array: true, nullable: true })
  images: string[];

  @Column({
    default: 'in_progress',
  })
  status: string;

  @Column({
    nullable: true,
  })
  completedAt: Date;

  @ManyToOne(() => Product, {
    createForeignKeyConstraints: false,
  })
  product: Product;

  @Column('int', { array: true, nullable: true })
  options: number[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Order>) {
    Object.assign(this, partial);
  }
}
