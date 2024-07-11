import { User } from 'src/user/entities/user.entity';
import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

export class Journal {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  date: string;

  @Column()
  title: string;

  @Column()
  content: string;
}
