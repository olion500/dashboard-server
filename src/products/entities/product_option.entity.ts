import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { OptionGroup } from '../../options/entities/option_group.entity';

@Entity()
export class ProductOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: 1,
  })
  consume: number;

  @ManyToOne(() => Product, (product) => product.productOptions)
  product: Product;

  @ManyToOne(() => OptionGroup, (optionGroup) => optionGroup.productOptions)
  option: OptionGroup;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
