import { CacheInterceptor, CacheTTL, CACHE_MANAGER, Controller, Get, Inject, Res, UseInterceptors } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Cache } from 'cache-manager';
import { ApiTags } from '@nestjs/swagger';

@Controller('chat')
@ApiTags('chat')
export class ChatController {
constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    private readonly chatService: ChatService,
) {}

@UseInterceptors(CacheInterceptor)
@CacheTTL(1000)
@Get('/')
async Home() {
  return this.chatService.findAll();
}

@Get('/api')
async Chat(@Res() res) {
  const messages = await this.chatService.getMessages();
  res.json(messages);
}
}
