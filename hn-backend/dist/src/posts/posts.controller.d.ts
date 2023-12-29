import { PostsService } from './posts.service';
import { CreatePostsDTO, GenericResposeDTO, GetPostsDTO } from './dto/post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    createPosts(res: any, body: CreatePostsDTO): Promise<GenericResposeDTO>;
    getPosts(res: any, query: GetPostsDTO): Promise<GenericResposeDTO>;
}
