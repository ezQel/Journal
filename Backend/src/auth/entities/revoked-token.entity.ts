import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReokedToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  jti: string;
}
