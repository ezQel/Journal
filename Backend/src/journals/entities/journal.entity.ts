import { Category } from 'src/category/entities/category.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Journal extends BaseEntity {
  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Category, (category) => category.journals)
  category: Category;

  @Column()
  date: string;

  @Column()
  title: string;

  @Column()
  content: string;
}
