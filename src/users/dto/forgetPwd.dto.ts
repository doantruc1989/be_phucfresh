import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ForgetPwdDto {
    @IsNotEmpty() 
    @IsEmail()
    @ApiProperty({
        description: 'your registed email',
      })
    email: string;
}