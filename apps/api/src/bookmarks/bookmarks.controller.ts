import { Controller } from "@nestjs/common";
import { Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../shared/guards/jwt-auth.guard";
import { CurrentUser } from "../shared/decorators/current-user.decorator";
import { BookmarkService } from "./bookmarks.service";
import { CreateBookmarkDto } from "./dtos/create-bookmark.dto";
import { UpdateBookmarkDto } from "./dtos/update-bookmark.dto";

@UseGuards(JwtAuthGuard)
@Controller("bookmarks")
export class BookmarkController {
  constructor(private readonly service: BookmarkService) {}

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.service.findAll(user.id);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @CurrentUser() user: any) {
    return this.service.findOne(id, user.id);
  }

  @Post()
  create(@Body() dto: CreateBookmarkDto, @CurrentUser() user: any) {
    return this.service.create(user.id, dto);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() dto: UpdateBookmarkDto,
    @CurrentUser() user: any,
  ) {
    return this.service.update(id, user.id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @CurrentUser() user: any) {
    return this.service.remove(id, user.id);
  }
}
