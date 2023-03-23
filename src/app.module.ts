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
      validationSchema: Joi.object({
        MYSQL_HOST: "localhost",
        MYSQL_PORT: 3306,
        MYSQL_USER: "root",
        MYSQL_DB: "db3",
        JWT_ACCESS_TOKEN_SECRET: "mycat",
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: "1d",
        JWT_REFRESH_TOKEN_SECRET: "mycat2",
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: "7d",
      }),
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
      host: 'localhost',
      port: 6379,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    })
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
