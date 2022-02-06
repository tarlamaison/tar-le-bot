import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Dossier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'simple-array' })
  exposed: string[];

  @Column()
  imageUri: string;
}