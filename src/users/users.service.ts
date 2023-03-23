import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ForgetPwdDto } from './dto/forgetPwd.dto';
import { CreateNewPwdDto } from './dto/createNewPwd.dto';
import { PaginationDto } from 'src/product/dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectQueue('send-mail')
    private queueService: Queue,
  ) {}

  async getUsers(paginationDto: PaginationDto) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .skip(paginationDto.take * (paginationDto.page - 1))
      .take(paginationDto.take)
      .getMany();
    return user;
  }

  async createNewUser(createUserDto: CreateUserDto) {
    const newUser = await this.usersRepository.create(createUserDto);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.usersRepository.create(createUserDto);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async findById(id: number) {
    return this.usersRepository.findOneBy({ id: id });
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email: email });
    return user;
  }

  async updateuser(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  async updatePW(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });
    const hashPw = await bcrypt.hash(updateUserDto.password, 10);
    user.password = hashPw;
    return this.usersRepository.update(id, user);
  }


  async sendEmailForgotPassword(forgetPwdDto: ForgetPwdDto) {
    console.log(forgetPwdDto);
    const userFromDb = await this.usersRepository
      .createQueryBuilder('users')
      .where({ email: forgetPwdDto.email })
      .getOne();
    console.log(userFromDb);
    if (!userFromDb) {
      throw new HttpException('EMAIL_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    await this.queueService.add(
      'register',
      {
        id: userFromDb.id,
        to: forgetPwdDto.email,
        name: 'ma.quy1987@gmail.com',
      },
      {
        removeOnComplete: true,
        removeOnFail: true,
      },
    );
    return HttpStatus.OK;
  }

  async createNewPwd(createNewPwdDto: CreateNewPwdDto) {
    console.log(createNewPwdDto);
    const hashPw = await bcrypt.hash(createNewPwdDto.password, 10);
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where({ id: createNewPwdDto.id })
      .update({ password: hashPw })
      .execute();
    return user;
  }
}
