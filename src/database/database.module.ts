import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/users/entity/user.entity';
import { Product } from 'src/product/entity/product.entity';
import { Category } from 'src/product/entity/category.entity';
import { OrderItem } from 'src/cart/entity/OrderItem.entity';
import { Discount } from 'src/product/entity/discount.entity';
import { Review } from 'src/product/entity/review.entity';
import { ProductVariant } from 'src/product/entity/productVariant.entity';
import { Chat } from 'src/chat/entity/chat.entity';
import { Payment } from 'src/cart/entity/Payment.entity';
import { Cities } from 'src/homepage/entity/cities.entity';
import { ProductImage } from 'src/product/entity/productImage.entity';
import { Blog } from 'src/blog/entity/blog.entity';
import { Districts } from 'src/homepage/entity/districts.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_DB'),
        entities: [
          User,
          Product,
          Category,
          OrderItem,
          Discount,
          Review,
          ProductVariant,
          ProductImage,
          Chat,
          Payment,
          Cities,
          Districts,
          Blog,
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
