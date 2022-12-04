import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Option } from './option.entity';
import { ProductOption } from '../../products/entities/product_option.entity';

@Entity()
export class OptionGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  placeholder: string;

  @OneToMany(() => Option, (option) => option.optionGroup, {
    createForeignKeyConstraints: false,
  })
  options: Option[];

  @OneToMany(() => ProductOption, (productOption) => productOption.option, {
    createForeignKeyConstraints: false,
  })
  productOptions: ProductOption[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<OptionGroup>) {
    Object.assign(this, partial);
    this.placeholder = `${this.name} 선택`;
  }
}
