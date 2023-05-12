import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Discount } from './discount.entity';
import { ProductImage } from './productImage.entity';
import { ProductVariant } from './productVariant.entity';
import { Review } from './review.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  productName: string;

  @Column('varchar')
  slug: string;

  @Column({default: 0})
  price: number;

  @Column({default: 0})
  initialPrice: number;

  @Column({default: 0})
  quantity: number;

  @Column({default: 0})
  sold: number;

  @Column({default: 0})
  stars: number;

  @Column('varchar')
  image: string;

  @Column({default: true})
  active: boolean;

  @Column('varchar')
  brand: string;

  @Column()
  content: string | null;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
    name: 'createdAt',
  })
  createdAt: Date;

  @ManyToOne(() => Category, (category) => category.product, {
    onDelete: 'CASCADE',
  })
  category: Category;

  @ManyToOne(() => Discount, (discount) => discount.product, {
    onDelete: 'CASCADE',
  })
  discount: Discount;

  @OneToMany(() => Review, (review) => review.product)
  review: Review[];

  @OneToMany(() => ProductVariant, (productvariant) => productvariant.product)
  productvariant: ProductVariant[];

  @OneToOne(() => ProductImage)
  @JoinColumn()
  productimage: ProductImage

}
