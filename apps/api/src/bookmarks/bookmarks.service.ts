import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookmarkDto } from './dtos/create-bookmark.dto';
import { UpdateBookmarkDto } from './dtos/update-bookmark.dto';
import { Bookmark } from './entities/bookmarks.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepo: Repository<Bookmark>
  ) {}

  async findAll(userId: string) {
    return this.bookmarkRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string) {
    const bookmark = await this.bookmarkRepo.findOne({
      where: { id, user: { id: userId } },
    });

    if (!bookmark) {
      throw new NotFoundException('Bookmark not found or inaccessible');
    }

    return bookmark;
  }

  async create(userId: string, dto: CreateBookmarkDto) {
    const bookmark = this.bookmarkRepo.create({
      title: dto.title.trim(),
      url: dto.url.trim(),
      category: dto.category?.trim(),
    });

    return this.bookmarkRepo.save(bookmark);
  }

  async update(id: string, userId: string, dto: UpdateBookmarkDto) {
    const bookmark = await this.findOne(id, userId);

    if (dto.title !== undefined) {
      bookmark.title = dto.title.trim();
    }

    if (dto.url !== undefined) {
      bookmark.url = dto.url.trim();
    }

    if (dto.category !== undefined) {
      bookmark.category = dto.category?.trim();
    }

    return this.bookmarkRepo.save(bookmark);
  }

  async remove(id: string, userId: string) {
    const bookmark = await this.findOne(id, userId);
    return this.bookmarkRepo.remove(bookmark);
  }
}
