import { IsNotEmpty, IsUrl, IsOptional } from "class-validator";

export class CreateBookmarkDto {
  @IsNotEmpty()
  title: string;

  @IsUrl()
  url: string;

  @IsOptional()
  category?: string;
}
