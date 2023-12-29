import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PostDTO {
  @IsOptional()
  @IsInt()
  rank: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  link: string;

  @IsOptional()
  @IsString()
  site: string;

  @IsBoolean()
  hasUpvote: boolean;

  @IsOptional()
  @IsInt()
  points: string;

  @IsOptional()
  @IsString()
  author: string;

  @IsString()
  time: string;

  @IsOptional()
  @IsString()
  comments: string;

  @IsOptional()
  @IsDateString()
  createdAt: Date;
}

export class CreatePostsDTO {
  @ValidateNested({ each: true })
  @Type(() => PostDTO)
  posts: PostDTO[];
}

export class GetPostsDTO {
  @IsOptional()
  page: number;
}

export class GenericResposeDTO {
  @IsNotEmpty()
  success: number;
  message: string;
  @IsOptional()
  posts: PostDTO;
}
