import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CategoryService } from '../services/category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Request() req, @Body() createCategoryDto: CreateCategoryDto) {
    const user = req.user;
    delete user.jti;
    return this.categoryService.createCategory(
      createCategoryDto.categoryName,
      user,
    );
  }

  @Get()
  findAll(@Request() req) {
    const user = req.user;
    delete user.jti;
    return this.categoryService.findAll(user);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const user = req.user;
    delete user.jti;
    return this.categoryService.findById(id, user);
  }

  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const categoryName = updateCategoryDto.categoryName;
    const user = req.user;
    delete user.jti;
    return this.categoryService.updateCategoryName(id, categoryName, user);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: number) {
    const user = req.user;
    delete user.jti;
    await this.categoryService.remove(id, user);
    return true;
  }
}
