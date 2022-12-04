import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductOption } from './product_option.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  // text_1line | text_3line
  @Column({
    nullable: true,
  })
  designType: string;

  // wapen | tag
  @Column({
    nullable: true,
  })
  productType: string;

  @OneToMany(() => ProductOption, (productOption) => productOption.product, {
    createForeignKeyConstraints: false,
  })
  productOptions: ProductOption[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}
