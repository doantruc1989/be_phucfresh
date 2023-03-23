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
import { CartService } from './cart.service';
import { Cache } from 'cache-manager';
import SaveOrderdto from './dto/saveOrder.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/users/entity/user.entity';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(
    private cartService: CartService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // @UseInterceptors(CacheInterceptor)
  // @CacheTTL(1000)
  @Post('order')
  async saveOrderItem(@Body() saveOrderdto: SaveOrderdto) {
    return this.cartService.saveOrder(saveOrderdto);
  }

  @Roles(Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get('order/:id')
  async getOrderById(@Param('id') id: number) {
    return this.cartService.getorderByid(id);
  }

  @Roles(Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Put('order/:id')
  async updateOrder(
    @Param('id') id: number,
    @Body() saveOrderdto: SaveOrderdto,
  ) {
    return this.cartService.updateOrderByid(id, saveOrderdto);
  }
}
