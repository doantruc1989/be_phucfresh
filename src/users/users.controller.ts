import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseFilePipeBuilder,
  HttpStatus,
  UploadedFiles,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ForgetPwdDto } from './dto/forgetPwd.dto';
import { CreateNewPwdDto } from './dto/createNewPwd.dto';
import { Role } from './entity/user.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { PaginationDto } from 'src/product/dto/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get('')
  async getAllUser(@Body() paginationDto: PaginationDto) {
    return this.usersService.getUsers(paginationDto);
  }

  @Roles(Role.Admin)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post('')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createNewUser(createUserDto);
  }

  @Roles(Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @Roles(Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Put('profile/:id')
  updatePw(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updatePW(id, updateUserDto);
  }

  @Roles(Role.User)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateuser(id, updateUserDto);
  }

  @Post('forgot-password')
  async sendEmailForgotPassword(@Body() forgetPwdDto: ForgetPwdDto) {
    return this.usersService.sendEmailForgotPassword(forgetPwdDto);
  }

  @Post('newpassword')
  async createNewPassword(@Body() createNewPwdDto: CreateNewPwdDto) {
    return this.usersService.createNewPwd(createNewPwdDto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/file',
        filename: (req, file, callback) => {
          const uniqeSuffix = Date.now();
          //  + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.originalname.substring(
            0,
            file.originalname.length - 4,
          )}-${uniqeSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image',
        })
        .addMaxSizeValidator({
          maxSize: 1000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return 'file uploaded';
  }
}
