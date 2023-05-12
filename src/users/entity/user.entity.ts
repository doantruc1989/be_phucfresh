import { Column, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Review } from 'src/product/entity/review.entity';
import { OrderItem } from 'src/cart/entity/OrderItem.entity';

export enum Role {
  User = 'user',
  Admin = 'admin',
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @IsNotEmpty()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Column({ default: ' ' })
  public address: string;

  @Column({ default: ' ' })
  public username: string;

  @Column({ default: ' ' })
  public phone: string;

  @Column({nullable:true})
  @Length(8, 24)
  public password: string;

  @Column({
    default:
      'https://nhungdieuthuvi.com/wp-content/uploads/2021/08/avartar-vit-vang-psyduck.jpg',
  })
  image: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role[];

  @Column({
    nullable: true,
  })
  @Exclude()
  public refreshToken?: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
    name: 'createdAt',
  })
  createdAt: Date;

  // @OneToMany(() => Review, (review) => review.user,{
  //   onDelete: 'CASCADE'
  // })
  // review: Review[]

  // @OneToMany(() => OrderItem, (orderItem) => orderItem.user,{
  //   onDelete: 'CASCADE', nullable:true
  // })
  // orderItem: OrderItem[]

  @DeleteDateColumn()
  deletedAt?: Date;
}
