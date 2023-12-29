import {
  Controller,
  Get,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { GenericResposeDTO, GetPostsDTO } from './posts/dto/post.dto';
import { PostsService } from './posts/posts.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly postsService: PostsService,
  ) {}

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
