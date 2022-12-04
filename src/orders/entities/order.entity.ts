import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
