import {  Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { Chat } from './entity/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  providers: [ChatService],
  controllers: [ChatController],
  imports: [TypeOrmModule.forFeature([Chat]),
],
})
export class ChatModule {}
