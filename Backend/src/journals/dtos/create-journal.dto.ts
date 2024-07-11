import { IsISO8601, IsNumber, IsString } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateJournalDto {
  @IsNumber()
  categoryId: number;

  @IsISO8601()
  date: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  user: Partial<User>;

  category: Partial<Category>;
}
