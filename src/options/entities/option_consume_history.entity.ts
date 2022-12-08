import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OptionConsumeHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number

  @Column()
  optionId: number;

  @Column({
    default: 0,
  })
  consume: number;

  @CreateDateColumn()
  createdAt: Date;

  constructor(partial: Partial<OptionConsumeHistory>) {
    Object.assign(this, partial);
  }
}