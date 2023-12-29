import { GetPostsDTO, PostDTO } from './dto/post.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
export declare class PostsService {
    private postsRepository;
    private readonly logger;
    constructor(postsRepository: Repository<Post>);
    createPosts(postsData: PostDTO[]): {
        message: string;
        success: number;
        errorMessage?: undefined;
    } | {
        errorMessage: string;
        success: number;
        message?: undefined;
    };
    getPosts(data: GetPostsDTO): Promise<{
        message: Post[];
        success: number;
        errorMessage?: undefined;
    } | {
        errorMessage: string;
        success: number;
        message?: undefined;
    }>;
    findOne(id: number): string;
}
