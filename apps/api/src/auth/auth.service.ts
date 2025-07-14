import { Injectable } from "@nestjs/common";
import { ConflictException } from "@nestjs/common/exceptions/conflict.exception";
import { UnauthorizedException } from "@nestjs/common/exceptions/unauthorized.exception";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const email = dto.email.trim().toLowerCase();

    const existingUser = await this.userRepo.findOneBy({ email });
    if (existingUser) {
      throw new ConflictException("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({
      email,
      password: hashedPassword,
    });

    const savedUser = await this.userRepo.save(user);

    return this.createToken(savedUser);
  }

  async login(dto: LoginDto) {
    const email = dto.email.trim().toLowerCase();

    const user = await this.userRepo.findOneBy({ email });
    const passwordValid =
      user && (await bcrypt.compare(dto.password, user.password));

    if (!passwordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return this.createToken(user);
  }

  private createToken(user: User): { access_token: string } {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findOne(id: string): Promise<User | null> {
    return this.userRepo.findOneBy({ id });
  }
}
