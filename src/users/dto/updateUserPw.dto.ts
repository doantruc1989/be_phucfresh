import { PartialType } from '@nestjs/swagger';
import { CreateNewPwdDto } from './createNewPwd.dto';

export class updateUserPwDto extends PartialType(CreateNewPwdDto) {}
