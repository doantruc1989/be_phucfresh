import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { Cities } from './entity/cities.entity';
import { Districts } from './entity/districts.entity';

@Injectable()
export class HomepageService {
  constructor(
    @InjectRepository(Cities)
    private citiesRepository: Repository<Cities>,
    @InjectRepository(Districts)
    private districtsRepository: Repository<Districts>,
  ) {}

  listProvinces = async () => {
    const provinces = await this.citiesRepository
    .createQueryBuilder('city')
    .leftJoinAndSelect('city.district', 'district')
    .getMany()
    return provinces;
  };

  listProvincesName = async (city: string) => {
    const cities = await this.citiesRepository
    .createQueryBuilder('city')
    .leftJoinAndSelect('city.district', 'district')
    .where({cities:city})
    .getMany()
    return cities
  };

  async getAllWards(district:string) {
    const wards = this.districtsRepository
      .createQueryBuilder()
      .where({districts : district})
      .getMany()
      return wards
  }
}
