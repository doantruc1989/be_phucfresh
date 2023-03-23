import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat/entity/chat.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(

  ) {}

}
