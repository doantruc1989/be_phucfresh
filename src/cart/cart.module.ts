import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entity/OrderItem.entity';
import { Product } from 'src/product/entity/product.entity';
import { ProductVariant } from 'src/product/entity/productVariant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem, Product, ProductVariant])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
