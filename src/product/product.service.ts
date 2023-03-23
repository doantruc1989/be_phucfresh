import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { Category } from './entity/category.entity';
import { Review } from './entity/review.entity';
import { ProductVariant } from './entity/productVariant.entity';
import { Cache } from 'cache-manager';
import { SearchProductDto } from './dto/searchProduct.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { UpdateReviewDto } from './dto/updateReview.dto';
import { UpdateProductVariantDto } from './dto/updateProductVariant.dto';
import { NewProductVariantDto } from './dto/newProductVariant.dto';
import { NewProductDto } from './dto/newProduct.dto';
import { NewReviewDto } from './dto/newReview.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,

    @InjectRepository(ProductVariant)
    private productVarRepository: Repository<ProductVariant>,

    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async getAllProduct(paginationDto: PaginationDto) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.discount', 'discount')
      .leftJoinAndSelect('product.productimage', 'productimage');

    if (paginationDto.search === 'all') {
      return product.getMany();
    }

     if (paginationDto.search === 'searchall') {
      return product
        .where(`LOWER(productName) LIKE '%${paginationDto.sortField}%'`)
        .orWhere(`LOWER(price) LIKE '%${paginationDto.sortField}%'`)
        .orWhere(`LOWER(content) LIKE '%${paginationDto.sortField}%'`)
        .orWhere(`LOWER(brand) LIKE '%${paginationDto.sortField}%'`)
        .andWhere({active:true})
        .skip(paginationDto.take * (paginationDto.page - 1))
        .take(paginationDto.take)
        .getMany();
    }
    
    if (paginationDto.search === 'allDESC') {
      return product
        .where({ active: true })
        .orderBy(`product.${paginationDto.sortField}`, 'DESC')
        .skip(paginationDto.take * (paginationDto.page - 1))
        .take(paginationDto.take)
        .getMany();
    }

    if (paginationDto.search === 'allRandom') {
      return product
        .where({ active: true })
        .orderBy('RAND()')
        .skip(paginationDto.take * (paginationDto.page - 1))
        .take(paginationDto.take)
        .getMany();
    }

    if (paginationDto.search === 'byprice') {
     
      return product
        .where({ active: true })
        .andWhere({ category: paginationDto.filter })
        .andWhere({ price: MoreThanOrEqual(paginationDto.fromPrice) })
        .andWhere({ price: LessThanOrEqual(paginationDto.toPrice) })
        .skip(paginationDto.take * (paginationDto.page - 1))
        .take(paginationDto.take)
        .getMany();
    }

    if (paginationDto.search === 'bybrand') {
      return product
        .where({ active: true })
        .andWhere({ category: paginationDto.filter })
        .andWhere({ brand: paginationDto.sortField })
        .orWhere(`LOWER(productName) LIKE '%${paginationDto.sortField}%'`)
        .skip(paginationDto.take * (paginationDto.page - 1))
        .take(paginationDto.take)
        .getMany()
    }

    if (paginationDto.search === 'byname') {
      return product
        .where({ active: true })
        .andWhere({ category: paginationDto.filter })
        .andWhere(`LOWER(productName) LIKE '%${paginationDto.sortField}%'`)
        .skip(paginationDto.take * (paginationDto.page - 1))
        .take(paginationDto.take)
        .getMany()
    }

    if (paginationDto.search === 'ASC') {
      return product
        .where({ active: true })
        .andWhere({ category: paginationDto.filter })
        .orderBy(`product.${paginationDto.sortField}`, 'ASC')
        .skip(paginationDto.take * (paginationDto.page - 1))
        .take(paginationDto.take)
        .getMany();
    }

    if (paginationDto.search === 'DESC') {
      return product
        .where({ active: true })
        .andWhere({ category: paginationDto.filter })
        .orderBy(`product.${paginationDto.sortField}`, 'DESC')
        .skip(paginationDto.take * (paginationDto.page - 1))
        .take(paginationDto.take)
        .getMany();
    }

    return product
      .where({ active: true })
      .andWhere({ category: paginationDto.filter })
      .skip(paginationDto.take * (paginationDto.page - 1))
      .take(paginationDto.take)
      .getMany();
  }

  async createProduct(newProductDto: NewProductDto) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .insert()
      .into(Product)
      .values(newProductDto)
      .execute();
    return product;
  }

  async getProductById(id: number) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.discount', 'discount')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.productimage', 'productimage')
      .leftJoinAndSelect('product.productvariant', 'productvariant')
      .leftJoinAndSelect('product.review', 'review')
      .where({ id: id })
      .getMany();
    return product
  }

  async postProductById(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .where({ id: id })
      .update(updateProductDto)
      .execute();
    return product;
  }

  async deleteProductById(id: number) {
    const product = await this.productRepository.delete(id);
    return product;
  }

  async searchProductAll(searchProductDto: SearchProductDto) {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.productvariant', 'productvariant')
      .leftJoinAndSelect('product.discount', 'discount')
      .leftJoinAndSelect('product.review', 'review');

    // if (searchProductDto.search === 'searchall') {
    //   const search = await this.productRepository
    //     .createQueryBuilder('product')
    //     .where(`LOWER(productName) LIKE '%${searchProductDto.sortBy}%'`)
    //     .orWhere(`LOWER(id) LIKE '%${searchProductDto.sortBy}%'`)
    //     .orWhere(`LOWER(price) LIKE '%${searchProductDto.sortBy}%'`)
    //     .orWhere(`LOWER(content) LIKE '%${searchProductDto.sortBy}%'`)
    //     .orWhere(`LOWER(brand) LIKE '%${searchProductDto.sortBy}%'`)
    //     .andWhere({active:true})
    //     .take(10)
    //     .getMany();
    //   return search;
    // }

    return product.getMany();
  }

  async getAllReview(paginationDto: PaginationDto) {
    const reviews = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.product', 'product')
      .leftJoinAndSelect('review.user', 'user')
      .skip(paginationDto.take * (paginationDto.page - 1))
      .take(paginationDto.take)
      .getMany();
    return reviews;
  }

  async postNewReview(newReviewDto: NewReviewDto) {
    const comment = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.product', 'product')
      .leftJoinAndSelect('review.user', 'user')
      .insert()
      .into(Review)
      .values(newReviewDto)
      .execute();
    return comment;
  }

  async getReviewById(id: number) {
    const review = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.product', 'product')
      .leftJoinAndSelect('review.user', 'user')
      .where({ id: id })
      .getMany();
    return review;
  }

  async postReviewById(id: number, updateReviewDto: UpdateReviewDto) {
    const reviews = await this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.product', 'product')
      .leftJoinAndSelect('review.user', 'user')
      .where({ id: id })
      .update(updateReviewDto)
      .execute();
    return reviews;
  }

  async deleteReviewById(id: number) {
    const review = await this.reviewRepository.softDelete({ id: id });
    return review;
  }

  async createProductVariant(newProductVariantDto: NewProductVariantDto) {
    const productVar = await this.productVarRepository
      .createQueryBuilder('productvariant')
      .leftJoinAndSelect('productvariant.product', 'product')
      .insert()
      .into(ProductVariant)
      .values(newProductVariantDto)
      .execute();
    return productVar;
  }

  async getProductVariantById(id: number) {
    const productVariant = await this.productVarRepository
      .createQueryBuilder('productvariant')
      .where({ id: id })
      .getMany();
    return productVariant;
  }

  async editProductVariantById(
    id: number,
    updateProductVariantDto: UpdateProductVariantDto,
  ) {
    const productVariant = await this.productVarRepository
      .createQueryBuilder('productvariant')
      .where({ id: id })
      .update(updateProductVariantDto)
      .execute();
    return productVariant;
  }

  async deleteProductVariantById(id: number) {
    const productVariant = await this.productVarRepository.delete(id);
    return productVariant;
  }

  async listAllCategory() {
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .getMany();
    return categories;
  }
}
