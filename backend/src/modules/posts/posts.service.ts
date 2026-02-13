import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private repo: Repository<Post>,
  ) {}

  private slugify(text: string) {
    return text.toLowerCase().replace(/\s+/g, '-');
  }

  async create(
    title: string,
    content: string,
    categoryId: number,
    authorId: number,
  ) {
    const slug = this.slugify(title);

    const post = this.repo.create({
      title,
      content,
      slug,
      categoryId,
      authorId,
    });

    return this.repo.save(post);
  }

  findAll() {
    return this.repo.find({
      relations: ['category', 'author'],
    });
  }

  async findOne(id: number) {
    const post = await this.repo.findOne({
      where: { id },
      relations: ['category', 'author'],
    });

    if (!post) throw new NotFoundException('Post not found');

    return post;
  }

  async update(
    id: number,
    title: string,
    content: string,
    categoryId: number,
    authorId: number,
  ) {
    const slug = this.slugify(title);

    await this.repo.update(id, {
      title,
      content,
      slug,
      categoryId,
      authorId,
    });

    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.repo.delete(id);

    if (!result.affected) throw new NotFoundException('Post not found');

    return { message: 'Post deleted' };
  }

  findByAuthor(authorId: number) {
    return this.repo.find({
      where: {
        author: { id: authorId },
      },
      relations: ['author', 'category'],
      order: { id: 'DESC' },
    });
  }
}
