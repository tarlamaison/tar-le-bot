import { Column, Entity } from 'typeorm';

@Entity()
export class Birthday {
  @Column()
  userId!: string;

  @Column()
  date!: Date;
}