import { Body, CacheInterceptor, CacheTTL, CACHE_MANAGER, Controller, Get, Inject, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HomepageService } from './homepage.service';
import { Cache } from 'cache-manager';
import axios from 'axios';

@Controller('homepage')
@ApiTags('homepage')
export class HomepageController {
    constructor(private homepageService: HomepageService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        
        ) { }

    // @UseInterceptors(CacheInterceptor)
    // @CacheTTL(1000)
    @Get('provinces/all')
    async getProvinces() {
        return this.homepageService.listProvinces()
    }

    @Get('provinces/:city')
    async getProvincesName(@Param('city') city: string) {
        return this.homepageService.listProvincesName(city)
    }

    @Get('provinces/city/:district')
    async getDistrictWards(@Param('district') district:string) {
        return this.homepageService.getAllWards(district)
    }

    // @Get('/grabapi')
    // async grabapi () {
    //     return await this.homepageService.getprofromApi()
    // }
}
