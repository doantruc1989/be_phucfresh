import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UsersController } from './users.controller';
import { BullModule } from '@nestjs/bull';
import { EmailConsumer } from './consumers/email.consumer';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  BullModule.registerQueue({
    name: 'send-mail',
  }),
  MulterModule.register({dest : './uploads'})
],
  providers: [UsersService,EmailConsumer],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
