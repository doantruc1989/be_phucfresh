import { ApiProperty } from "@nestjs/swagger";
import {  IsEmail,  IsNotEmpty, IsOptional, Length, Matches } from "class-validator";
import { MESSAGES, REGEX } from "src/utils/app.utils";
import { Role } from "../entity/user.entity";

export class CreateUserDto {

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: "this user's email",
  })
  email: string;


  @IsNotEmpty()
  @ApiProperty({
    description: "this user's name",
  })
  username: string;
  
  @IsNotEmpty()
  @Length(8,24)
  @ApiProperty({
    description: "this user's password",
  })
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

  @IsOptional()
  @ApiProperty({
    description: "this user's image url",
  })
  image: string;

  @IsOptional()
  @ApiProperty({
    description: "role can be user or admin",
  })
  role: Role[];

  @ApiProperty({
    description: "this user's phone number",
  })
  phone?:string;

  refreshToken?: string;

  @ApiProperty({
    description: "this user's address",
  })
  address?: string;

}
