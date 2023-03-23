import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { MESSAGES, REGEX } from "src/utils/app.utils";

export class AuthDto {

  @IsNotEmpty()
  @IsEmail()
  email: string;


  @IsNotEmpty()
  password: string;
  
  remember: boolean;
}
