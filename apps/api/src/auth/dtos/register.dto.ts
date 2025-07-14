import { IsEmail, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  @MaxLength(20)
  password: string;
}
