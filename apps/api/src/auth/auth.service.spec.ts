import { ConflictException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { AuthService } from "./auth.service";
import { User } from "./entities/user.entity";

jest.mock("bcrypt");

describe("AuthService", () => {
  let service: AuthService;
  let userRepo: jest.Mocked<Repository<User>>;
  let jwtService: jest.Mocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepo = module.get(getRepositoryToken(User));
    jwtService = module.get(JwtService);
  });

  describe("register", () => {
    it("should throw if user already exists", async () => {
      userRepo.findOneBy.mockResolvedValue({
        id: "1",
        email: "test@example.com",
        password: "mocked",
        bookmarks: [],
      } as User);

      await expect(
        service.register({ email: "test@example.com", password: "123" }),
      ).rejects.toBeInstanceOf(ConflictException);
    });

    it("should create and return token for new user", async () => {
      const dto = { email: "new@example.com", password: "123" };
      userRepo.findOneBy.mockResolvedValue(null);

      const createdUser = { ...dto };

      userRepo.create.mockReturnValue(createdUser as User);
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashed123");

      const savedUser = { ...createdUser, id: "abc" };
      userRepo.save.mockResolvedValue(savedUser as User);

      jwtService.sign.mockReturnValue("mock-token");

      const result = await service.register(dto);

      expect(userRepo.findOneBy).toHaveBeenCalledWith({ email: dto.email });
      expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 10);
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: savedUser.id,
        email: savedUser.email,
      });
      expect(result).toEqual({ access_token: "mock-token" });
    });
  });

  describe("findOne", () => {
    it("should find user by id", async () => {
      const userId = "123";
      const user: User = { id: userId, email: "test@example.com", password: "mocked", bookmarks: [] };
      userRepo.findOneBy.mockResolvedValue(user);

      const result = await service.findOne(userId);

      expect(userRepo.findOneBy).toHaveBeenCalledWith({ id: userId });
      expect(result).toBe(user);
    });
  });

  describe("login", () => {
    it("should throw if user not found", async () => {
      userRepo.findOneBy.mockResolvedValue(null);
      try {
        await service.login({ email: "missing@example.com", password: "123" });
        fail("Should throw UnauthorizedException");
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });

    it("should throw if password is incorrect", async () => {
      userRepo.findOneBy.mockResolvedValue({
        id: "1",
        email: "x",
        password: "hashed",
        bookmarks: [],
      } as User);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      try {
        await service.login({ email: "x", password: "wrong" });
        fail("Should throw UnauthorizedException");
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });

    it("should return token if login is valid", async () => {
      const user: User = { id: "1", email: "x", password: "hashed", bookmarks: [] };
      userRepo.findOneBy.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jwtService.sign.mockReturnValue("valid-token");

      const result = await service.login({ email: "x", password: "123" });

      expect(result).toEqual({ access_token: "valid-token" });
    });
  });

  // Example of safely handling errors (you can remove if not used)
  it("should handle errors safely", async () => {
    try {
      // Suppose this method throws error
      await service["someMethodThatThrows"]();
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Safe access to message
        console.error(error.message);
      } else {
        throw error;
      }
    }
  });
});
