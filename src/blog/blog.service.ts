import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationBlogDto } from './dto/paginationblog.dto';
import { Blog } from './entity/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private blogRepository: Repository<Blog>,
  ) {}

  async listAll(paginationBlogDto: PaginationBlogDto) {
    const blogs = await this.blogRepository

    if ((paginationBlogDto.filter = 'all')) {
      return blogs.createQueryBuilder('blog').getMany();
    }

    return blogs.createQueryBuilder('blog')
      .skip(paginationBlogDto.take * (paginationBlogDto.page - 1))
      .take(paginationBlogDto.take)
      .getMany();
  }

  async getBlogByid(id:number) {
    const blog = await this.blogRepository.findOneBy({id:id})
    return blog
  }
}
