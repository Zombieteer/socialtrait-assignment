export declare class PostDTO {
    rank: string;
    title: string;
    link: string;
    site: string;
    hasUpvote: boolean;
    points: string;
    author: string;
    time: string;
    comments: string;
    createdAt: Date;
}
export declare class CreatePostsDTO {
    posts: PostDTO[];
}
export declare class GetPostsDTO {
    page: number;
}
export declare class GenericResposeDTO {
    success: number;
    message: string;
    posts: PostDTO;
}
