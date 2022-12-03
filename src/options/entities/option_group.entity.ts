import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Option } from './option.entity';

@Entity()
export class OptionGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Option, (option) => option.optionGroup)
  options: Option[];

  constructor(partial: Partial<OptionGroup>) {
    Object.assign(this, partial);
  }
}
