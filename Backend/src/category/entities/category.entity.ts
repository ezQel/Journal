import { BaseEntity } from 'src/common/entities/base.entity';
import { Journal } from 'src/journals/entities/journal.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';

@Entity()
@Unique(['name', 'user'])
export class Category extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.categories)
  user: User;

  @OneToMany(() => Journal, (journal) => journal.category)
  journals: Journal[];
}
