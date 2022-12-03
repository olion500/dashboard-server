import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OptionGroup } from './option_group.entity';

@Entity()
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column({
    default: 0,
  })
  count: number;

  @ManyToOne(() => OptionGroup, (optionGroup) => optionGroup.options)
  optionGroup: OptionGroup;

  constructor(partial: Partial<Option>) {
    Object.assign(this, partial);
  }
}
