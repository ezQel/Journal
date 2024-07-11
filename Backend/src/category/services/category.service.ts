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

    return this.categoryRepository.save({ name: name, user });
  }

  findUsercategories(user: User): Promise<Category[]> {
    return this.categoryRepository.find({
      where: { user },
      relations: ['user'],
      select: ['user'],
    });
  }

  findByCategoryName(name: string, user: User): Promise<Category> {
    return this.categoryRepository.findOne({ where: { name, user } });
  }

  async findById(id: number, user: User): Promise<Category> {
    return this.categoryRepository
      .findOne({ where: { id, user } })
      .catch(() => {
        throw new BadRequestException(
          'Category not found or you do not have permissions to access this category',
        );
      });
  }

  async updateCategoryName(
    id: number,
    name: string,
    user: User,
  ): Promise<Category> {
    const existingCategory = await this.findByCategoryName(name, user);

    if (existingCategory?.id === id) return existingCategory;

    return this.categoryRepository.save({ id, name }).catch(() => {
      throw new BadRequestException('Category cannot be updated');
    });
  }

  async remove(id: number, user: User): Promise<Category> {
    const category = await this.findById(id, user);

    if (!category) {
      throw new BadRequestException('Category does not exist');
    }

    // TODO: Ensure that the category is not attached to a journal

    return this.categoryRepository.remove(category);
  }
}
