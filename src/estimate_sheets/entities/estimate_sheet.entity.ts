import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class EstimateSheet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  estimateNo: string;

  @Column()
  name: string;

  @Column({ type: 'timestamptz' })
  estimatedAt: Date;

  @Column()
  companyName: string;

  @Column()
  companyId: string;

  @Column()
  companyCEO: string;

  @Column()
  totalCost: number;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<EstimateSheet>) {
    Object.assign(this, partial);
  }
}
