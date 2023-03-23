import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { Product } from './product.entity';

  
  @Entity('productimage')
  export class ProductImage {
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
    id: number;
  
    @Column('varchar', {nullable:true})
    image1: string;
  
    @Column('varchar', {nullable:true})
    image2: string;

    @Column('varchar', {nullable:true})
    image3: string;

    @Column('varchar', {nullable:true})
    image4: string;
  
    @Column('varchar', {nullable:true})
    image5: string;

    @OneToOne(() => Product)
    product: Product
  }
  