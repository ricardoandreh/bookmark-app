import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";

@Controller("auth")
export class AuthController {
  constructor(private service: AuthService) {}

  @Post("register")
  register(@Body() dto: RegisterDto) {
    return this.service.register(dto);
  }

  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.service.login(dto);
  }
}
