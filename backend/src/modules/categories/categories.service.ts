import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private repo: Repository<Category>,
  ) {}

  private slugify(text: string) {
    return text.toLowerCase().replace(/\s+/g, '-');
  }

  async create(name: string) {
    const slug = this.slugify(name);

    const category = this.repo.create({
      name,
      slug,
    });

    return this.repo.save(category);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const category = await this.repo.findOneBy({ id });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: number, name: string) {
    const slug = this.slugify(name);

    await this.repo.update(id, { name, slug });

    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.repo.delete(id);

    if (!result.affected) {
      throw new NotFoundException('Category not found');
    }

    return { message: 'Category deleted' };
  }
}
