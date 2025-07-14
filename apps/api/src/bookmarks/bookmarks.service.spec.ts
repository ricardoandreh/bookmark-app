import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BookmarkService } from "./bookmarks.service";
import { Bookmark } from "./entities/bookmarks.entity";

type DeepMock<T> = {
  [K in keyof T]: jest.Mock<unknown>;
};

describe("BookmarkService", () => {
  let service: BookmarkService;
  let repo: jest.Mocked<Repository<Bookmark>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookmarkService,
        {
          provide: getRepositoryToken(Bookmark),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BookmarkService>(BookmarkService);
    repo = module.get(getRepositoryToken(Bookmark));
  });

  it("should return all bookmarks for user", async () => {
    const mockBookmarks: Bookmark[] = [
      {
        id: "1",
        title: "Site",
        url: "https://site.com",
        user: { id: "123" } as any,
        createdAt: new Date(),
      },
    ];

    repo.find.mockResolvedValue(mockBookmarks);

    const result = await service.findAll("123");

    expect(result).toEqual(mockBookmarks);
    expect(repo.find).toHaveBeenCalledWith({
      where: { user: { id: "123" } },
      order: { createdAt: "DESC" },
    });
  });

  it("should throw if bookmark not found", async () => {
    repo.findOne.mockResolvedValue(null);
    await expect(service.findOne("1", "123")).rejects.toBeInstanceOf(NotFoundException);
  });

  it("should create a bookmark", async () => {
    const dto = {
      title: "Google",
      url: "https://google.com",
    };

    const newBookmark: Bookmark = {
      id: "1",
      ...dto,
      user: { id: "123" } as any,
      createdAt: new Date(),
    };

    repo.create.mockReturnValue(newBookmark);
    repo.save.mockResolvedValue(newBookmark);

    const result = await service.create("123", dto);

    expect(result).toEqual(newBookmark);
    expect(repo.create).toHaveBeenCalledWith({
      title: dto.title.trim(),
      url: dto.url.trim(),
    });
  });

  it("should update a bookmark", async () => {
    const dto = {
      title: "Updated Title",
    };

    const existing: Bookmark = {
      id: "1",
      title: "Old Title",
      url: "https://old.com",
      user: { id: "123" } as any,
      createdAt: new Date(),
    };

    const updated: Bookmark = {
      ...existing,
      title: dto.title,
    };

    jest.spyOn(service, "findOne").mockResolvedValue(existing);
    repo.save.mockResolvedValue(updated);

    const result = await service.update("1", "123", dto);

    expect(result).toEqual(updated);
    expect(service.findOne).toHaveBeenCalledWith("1", "123");
    expect(repo.save).toHaveBeenCalledWith({ ...existing, ...dto });
  });

  it("should remove a bookmark", async () => {
    const existing: Bookmark = {
      id: "1",
      title: "To be deleted",
      url: "https://to-delete.com",
      user: { id: "123" } as any,
      createdAt: new Date(),
    };

    jest.spyOn(service, "findOne").mockResolvedValue(existing);
    repo.remove.mockResolvedValue(existing);

    const result = await service.remove("1", "123");

    expect(result).toEqual(existing);
    expect(service.findOne).toHaveBeenCalledWith("1", "123");
    expect(repo.remove).toHaveBeenCalledWith(existing);
  });
});
