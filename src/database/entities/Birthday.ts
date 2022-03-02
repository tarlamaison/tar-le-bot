import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Birthday {
  @PrimaryColumn()
  userId!: string;

  @Column()
  date!: Date;
}