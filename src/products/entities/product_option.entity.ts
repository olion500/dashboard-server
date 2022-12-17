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

  @ManyToOne(() => Product, (product) => product.productOptions, {
    createForeignKeyConstraints: false,
  })
  product: Product;

  @ManyToOne(() => OptionGroup, (optionGroup) => optionGroup.productOptions, {
    createForeignKeyConstraints: false,
  })
  option: OptionGroup;

  @Column({
    default: true,
  })
  enabled: boolean;

  @Column('int', { array: true, default: [] })
  enabledOptions: number[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
