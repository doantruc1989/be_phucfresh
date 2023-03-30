import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async signUp(createUserDto: CreateUserDto) {
    // Check if user exists
    const userExists = await this.usersService.findByEmail(createUserDto.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const hash = await this.hashData(createUserDto.password);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hash,
    });
    const tokens = await this.getTokens(
      newUser.id,
      newUser.email,
      newUser.role,
    );
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async signIn(data: AuthDto) {
    const user = await this.usersService.findByEmail(data.email);
    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    const passwordMatches = await bcrypt.compare(data.password, user.password);
    if (!passwordMatches) {
      throw new BadRequestException('Password is incorrect');
    }
    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return {
      tokens,
      role: user.role,
      id: user.id,
      username: user.username,
      image: user.image,
      address: user.address,
      phone: user.phone,
    };
  }

  async logout(userId: number) {
    this.usersService.updateuser(userId, { refreshToken: null });
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.findById(userId);

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return { tokens, id: user.id, username: user.username, image: user.image };
  }

  async hashData(data: string) {
    return await bcrypt.hash(data, 10);
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.updateuser(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userId: number, email: string, role: any) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(
        {
          sub: userId,
          role,
          email,
        },
        {
          secret: process.env.ACCESS_TOKEN_SECRRET,
          expiresIn: process.env.ACCESS_TOKEN_EXP,
        },
      ),
      this.jwtService.sign(
        {
          sub: userId,
          role,
          email,
        },
        {
          secret: process.env.REFRESH_TOKEN_SECRRET,
          expiresIn: process.env.REFRESH_TOKEN_EXP,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }
    const ggUser = {
      email: req.user.email,
      username: req.user.lastName + ' ' + req.user.firstName,
    };
    const userEmail = await this.usersRepository.findOneBy({
      email: ggUser.email,
    });
    
    if (userEmail) {
      const tokens = await this.getTokens(userEmail.id, userEmail.email, userEmail.role);
      return {
        tokens,
        role: userEmail.role,
        id: userEmail.id,
        username: userEmail.username,
        image: userEmail.image,
        address: userEmail.address,
        phone: userEmail.phone,
      };
    }
    const newUser = await this.usersRepository.create(ggUser);
    await this.usersRepository.save(newUser);
    const tokens = await this.getTokens(newUser.id, newUser.email, newUser.role);
    return {
      tokens,
      role: newUser.role,
      id: newUser.id,
      username: newUser.username,
      image: newUser.image,
      address: newUser.address,
      phone: newUser.phone,
    };
  }

  async facebookLogin(req) {
    if (!req.user) {
      return 'No user from fb';
    }
    const fbUser = {
      email: req.user.email,
      username: req.user.lastName + ' ' + req.user.firstName,
    };

    const userEmail = await this.usersRepository
    .createQueryBuilder()
    .where({email: req.user.email})
    .getOne()

    if (userEmail) {
      const tokens = await this.getTokens(userEmail.id, userEmail.email, userEmail.role);
      return {
        tokens,
        role: userEmail.role,
        id: userEmail.id,
        username: userEmail.username,
        image: userEmail.image,
        address: userEmail.address,
        phone: userEmail.phone,
      };
    }
    const newUser = await this.usersRepository.create(fbUser);
    await this.usersRepository.save(newUser);
    const tokens = await this.getTokens(newUser.id, newUser.email, newUser.role);
    return {
      tokens,
      role: newUser.role,
      id: newUser.id,
      username: newUser.username,
      image: newUser.image,
      address: newUser.address,
      phone: newUser.phone,
    };
  }
}
