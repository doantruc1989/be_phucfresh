import {
  Body,
  CacheInterceptor,
  CacheTTL,
  CACHE_MANAGER,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Cache } from 'cache-manager';
import { SearchProductDto } from './dto/searchProduct.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/users/entity/user.entity';
import { UpdateReviewDto } from './dto/updateReview.dto';
import { UpdateProductVariantDto } from './dto/updateProductVariant.dto';
import { NewProductVariantDto } from './dto/newProductVariant.dto';
import { NewProductDto } from './dto/newProduct.dto';
import { NewReviewDto } from './dto/newReview.dto';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(
    private productService: ProductService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('/category')
  async listCategory() {
    return await this.productService.listAllCategory()
  }

  
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('/search')
  async searchProduct(@Query() searchProductDto: SearchProductDto) {
    return this.productService.searchProductAll(searchProductDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('')
  async getProducts(@Query() paginationDto: PaginationDto) {
    return this.productService.getAllProduct(paginationDto);
  }

  @Roles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Post('')
  async createNewProduct(@Body() newProductDto: NewProductDto) {
    return this.productService.createProduct(newProductDto);
  }

  // @UseInterceptors(CacheInterceptor)
  // @CacheTTL(1000)
  @Get(':name')
  async getProductId(@Param('name') name: string) {
    return this.productService.getProductById(name);
  }

  @Roles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Put(':id')
  async postProductId(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.postProductById(id, updateProductDto);
  }

  @Roles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Delete(':id')
  async deleteProductId(@Param('id') id: number) {
    return this.productService.deleteProductById(id)
  }

  @Roles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('review')
  async getReview(@Query() paginationDto: PaginationDto) {
    return this.productService.getAllReview(paginationDto);
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Post('review')
  async postComment(@Body() newReviewDto: NewReviewDto) {
    return this.productService.postNewReview(newReviewDto);
  }

  @Roles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('review/:id')
  async getReviewId(@Param('id') id: number) {
    return this.productService.getReviewById(id);
  }

  @Roles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Put('review/:id')
  async postReviewId(
    @Param('id') id: number,
    @Body()updateReviewDto:UpdateReviewDto,
  ) {
    return this.productService.postReviewById(id, updateReviewDto);
  }

  @Roles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Delete('review/:id')
  async deleteReviewId(@Param('id') id: number) {
    return this.productService.deleteReviewById(id);
  }

  @Roles(Role.Admin)
  @UseGuards(AccessTokenGuard)
  @Post('variant')
  async createNewProductVariant(@Body() newProductVariantDto: NewProductVariantDto) {
    return this.productService.createProductVariant(newProductVariantDto);
  }

  @Roles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Get('variant/:id')
  async getProductVariantId(@Param('id') id: number) {
    return this.productService.getProductVariantById(id);
  }

  @Roles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(1000)
  @Put('variant/:id')
  async postProducVariantId(
    @Param('id') id: number,
    @Body() updateProductVariantDto: UpdateProductVariantDto,
  ) {
    return this.productService.editProductVariantById(id, updateProductVariantDto);
  }

  @Roles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Delete('variant/:id')
  async deleteProductVariantId(@Param('id') id: number) {
    return this.productService.deleteProductVariantById(id);
  }
}
