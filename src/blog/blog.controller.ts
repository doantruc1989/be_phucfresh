import { CACHE_MANAGER, Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ApiTags } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { PaginationBlogDto } from './dto/paginationblog.dto';

@Controller('blog')
@ApiTags('blog')
export class BlogController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    private readonly blogService: BlogService,
  ) {}

  @Get('')
  async listAllBlog(@Query() paginationBlogDto: PaginationBlogDto) {
    return this.blogService.listAll(paginationBlogDto)
  }

  @Get(':id')
  async getBlogById(@Param('id')id:number) {
    return this.blogService.getBlogByid(id)
  }
}
