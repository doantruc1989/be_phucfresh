import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class NewReviewDto {
  @IsNotEmpty()
  @ApiProperty({
    description: "this review's comment",
  })
  comment: string;

  @IsNotEmpty()
  @ApiProperty({
    description: "this review's stars",
  })
  stars: number;

  @IsOptional()
  @ApiProperty({
    description: "this product's type",
  })
  type?: string;

  @IsOptional()
  @ApiProperty({
    description: "this review's parentId",
  })
  parentId?: number;

  @IsNotEmpty()
  @ApiProperty({
    description: "this product's Id",
  })
  productId: number;

  @IsNotEmpty()
  @ApiProperty({
    description: "this user's Id",
  })
  userId: number;
}
