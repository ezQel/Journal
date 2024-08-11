import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(name: string, user: User): Promise<Category> {
    const category = await this.findByCategoryName(name, user);

    if (category) throw new ConflictException('Category already exists');

    return this.categoryRepository.save({ name, user });
  }

  findUsercategories(user: User): Promise<Category[]> {
    return this.categoryRepository.find({
      where: { user },
    });
  }

  findByCategoryName(name: string, user: User): Promise<Category | null> {
    return this.categoryRepository.findOne({ where: { name, user } });
  }

  findById(id: number, user: User): Promise<Category | null> {
    return this.categoryRepository.findOne({ where: { id, user } });
  }

  async updateCategoryName(
    id: number,
    name: string,
    user: User,
  ): Promise<Category> {
    const existingCategory = await this.findByCategoryName(name, user);

    if (existingCategory?.id === id) return existingCategory;

    try {
      return await this.categoryRepository.save({ id, name });
    } catch (e) {
      throw new BadRequestException('Failed to update category');
    }
  }

  async remove(id: number, user: User): Promise<Category> {
    const category = await this.findById(id, user);

    if (!category) {
      throw new BadRequestException('Category does not exist');
    }

    try {
      return await this.categoryRepository.remove(category);
    } catch (e) {
      throw new BadRequestException('Failed to delete category');
    }
  }
}
