import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  take?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  filter?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  sortField?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  condition?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  condition2?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  order?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  search?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  fromPrice?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  toPrice?: string;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
