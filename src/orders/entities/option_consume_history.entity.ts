import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Option } from '../../options/entities/option.entity';

@Entity()
export class OptionConsumeHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, {
    createForeignKeyConstraints: false,
  })
  product: Product;

  @ManyToOne(() => Option, {
    createForeignKeyConstraints: false,
  })
  option: Option;

  @Column()
  consume: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<OptionConsumeHistory>) {
    Object.assign(this, partial);
  }
}
