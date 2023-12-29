import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Res,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostsDTO, GenericResposeDTO, GetPostsDTO } from './dto/post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('addPosts')
  @UsePipes(new ValidationPipe())
  async createPosts(
    @Res() res,
    @Body() body: CreatePostsDTO,
  ): Promise<GenericResposeDTO> {
    try {
      this.postsService.createPosts(body.posts);
      return res.status(200);
    } catch (error) {
      const data = {
        errorMessage: 'Error with create posts -> ' + error.message,
        success: 0,
      };
      console.log(data);
      return res.status(500).json(data);
    }
  }

  @Get()
  @UsePipes(new ValidationPipe())
  async getPosts(
    @Res() res,
    @Query() query: GetPostsDTO,
  ): Promise<GenericResposeDTO> {
    try {
      const data = await this.postsService.getPosts(query);
      return res.status(200).json(data);
    } catch (error) {
      const data = {
        errorMessage: 'Error with create posts -> ' + error.message,
        success: 0,
      };
      console.log(data);
      return res.status(500).json(data);
    }
  }
}
