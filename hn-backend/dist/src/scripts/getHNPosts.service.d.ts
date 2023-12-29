import { PostsService } from 'src/posts/posts.service';
type NewsEntry = {
    rank: string | null;
    title: string | null;
    link: string | null;
    site: string | null;
    hasUpvote: boolean;
    points: string | null;
    author: string | null;
    time: string | null;
    comments: string | null;
};
export declare class ScrapHnService {
    private readonly postsService;
    private readonly logger;
    constructor(postsService: PostsService);
    handleCron(): Promise<void>;
    extractDataFromHTML(htmlString: string): NewsEntry[];
}
export {};
