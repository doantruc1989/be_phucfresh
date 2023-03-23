import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { Discount } from './entity/discount.entity';
import { Product } from './entity/product.entity';
import { ProductImage } from './entity/productImage.entity';
import { ProductVariant } from './entity/productVariant.entity';
import { Review } from './entity/review.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Category,
      Review,
      Discount,
      ProductVariant,
      ProductImage
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
