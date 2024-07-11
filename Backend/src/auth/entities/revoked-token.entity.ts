import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RevokedToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  jti: string;
}
