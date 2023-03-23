import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class NewProductDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "this product's name",
  })
  productName: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "this product's price",
  })
  price: number;

  @IsNotEmpty()
  @ApiProperty({
    description: "this product's initial price",
  })
  initialPrice: number;

  @IsNotEmpty()
  @ApiProperty({
    description: "this product's quantity",
  })
  quantity: number;

  @IsOptional()
  @ApiProperty({
    description: 'quantity sold',
  })
  sold?: number;

  @IsOptional()
  @ApiProperty({
    description: 'review stars',
  })
  stars?: number;

  @IsNotEmpty()
  @ApiProperty({
    description: "this product's image url",
  })
  image: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "this product's activation",
    
  })
  active: boolean;

  @IsNotEmpty()
  @ApiProperty({
    description: "this product's brand",
  })
  brand: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "this product's description",
  })
  content: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "this product's category",
  })
  categoryId: number;

  @IsOptional()
  @ApiProperty({
    description: "this product's discount percent",
  })
  discountId?: number;
}
