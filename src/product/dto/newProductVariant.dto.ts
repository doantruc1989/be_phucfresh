import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class NewProductVariantDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "this variant's type",
  })
  type: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "this variant's price",
  })
  typePrice: number;

  @IsNotEmpty()
  @ApiProperty({
    description: "this product's id",
  })
  productId: number;
}
