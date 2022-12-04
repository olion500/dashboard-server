import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OptionGroup } from './option_group.entity';

@Entity()
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  image: string;

  @Column({
    default: 0,
  })
  count: number;

  @ManyToOne(() => OptionGroup, (optionGroup) => optionGroup.options, {
    createForeignKeyConstraints: false,
  })
  optionGroup: OptionGroup;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Option>) {
    Object.assign(this, partial);
  }
}
