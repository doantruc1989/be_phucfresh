import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, Matches } from 'class-validator';
import { MESSAGES, REGEX } from 'src/utils/app.utils';

export class CreateNewPwdDto {
  @IsNotEmpty()
  @Length(8, 24)
  @ApiProperty({
    description: 'new password',
    minimum: 8,
  })
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

  @ApiProperty({
    description: "this user's id",
  })
  id?: number;
}
