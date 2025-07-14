import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookmarkController } from "./bookmarks.controller";
import { BookmarkService } from "./bookmarks.service";
import { Bookmark } from "./entities/bookmarks.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark])],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}
