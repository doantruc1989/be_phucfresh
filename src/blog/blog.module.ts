import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Blog } from './entity/blog.entity';


@Module({
  providers: [BlogService],
  controllers: [BlogController],
  imports: [TypeOrmModule.forFeature([Blog]),
],
})
export class BlogModule {}
