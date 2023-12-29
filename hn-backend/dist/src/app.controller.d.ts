import { AppService } from './app.service';
import { GenericResposeDTO, GetPostsDTO } from './posts/dto/post.dto';
import { PostsService } from './posts/posts.service';
export declare class AppController {
    private readonly appService;
    private readonly postsService;
    constructor(appService: AppService, postsService: PostsService);
    getPosts(res: any, query: GetPostsDTO): Promise<GenericResposeDTO>;
}
