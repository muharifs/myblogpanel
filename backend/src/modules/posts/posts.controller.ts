import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post as HttpPost,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private service: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @HttpPost()
  create(@Req() req, @Body() body: CreatePostDto) {
    return this.service.create(
      body.title,
      body.content,
      body.categoryId,
      body.authorId,
    );
  }

  @Get('/all')
  findAllPageP() {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: Request & { user: { id: number } }) {
    return this.service.findByAuthor(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePostDto) {
    return this.service.update(
      id,
      body.title,
      body.content,
      body.categoryId,
      body.authorId,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
