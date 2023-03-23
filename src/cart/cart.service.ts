import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entity/product.entity';
import { ProductVariant } from 'src/product/entity/productVariant.entity';
import { Repository } from 'typeorm';
import SaveOrderdto from './dto/saveOrder.dto';
import { OrderItem } from './entity/OrderItem.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductVariant)
    private productVariantRepository: Repository<ProductVariant>,
  ) {}

  async saveOrder(saveOrderdto: SaveOrderdto) {
    const item = JSON.parse(saveOrderdto.orderItems);
    let revenue: number;
    let totalRevenue: number = 0;

    for (let i = 0; i < item.length; i++) {
      const productId = item[i].id.split('.')[0];
      const qty = item[i].quantity;
      const product = await this.productRepository.findOneBy({
        id: productId,
      });
      product.quantity = product.quantity - qty;
      await this.productRepository.save(product);
      revenue = (item[i].price - product.initialPrice) * qty;
      totalRevenue += revenue;
      await this.orderItemRepository.save(saveOrderdto);
    }
  }

  async getorderByid(id: number) {
    const orders = await this.orderItemRepository
      .createQueryBuilder('orderitem')
      .leftJoinAndSelect('orderitem.user', 'user')
      .where({
        user: {
          id: id,
        },
      })
      .getMany();
    return orders;
  }

  async updateOrderByid(id: number, saveOrderdto: SaveOrderdto) {
    console.log(saveOrderdto);
    const order = await this.orderItemRepository.findOneBy({ id: id });
    order.status = saveOrderdto.status;
    return this.orderItemRepository.update(id, order);
  }
}
