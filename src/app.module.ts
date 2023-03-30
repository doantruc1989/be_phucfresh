import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { ChatModule } from './chat/chat.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Chat } from './chat/entity/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import { BullModule } from '@nestjs/bull';
import { HomepageModule } from './homepage/homepage.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    ProductModule,
    HomepageModule,
    CartModule,
    BlogModule,
    ChatModule,
    TypeOrmModule.forFeature([Chat]),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT
      },
    })
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
