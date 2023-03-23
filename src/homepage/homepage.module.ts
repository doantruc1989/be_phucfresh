import { Module } from '@nestjs/common';
import { HomepageService } from './homepage.service';
import { HomepageController } from './homepage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cities } from './entity/cities.entity';
import { Districts } from './entity/districts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Cities, Districts])],
  providers: [HomepageService],
  controllers: [HomepageController]
})
export class HomepageModule {}
