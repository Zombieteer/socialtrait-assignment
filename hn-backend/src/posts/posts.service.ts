import { Injectable, Logger } from '@nestjs/common';
import { GetPostsDTO, PostDTO } from './dto/post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);
  constructor(
    @InjectRepository(Post, 'postgres')
    private postsRepository: Repository<Post>,
  ) {}

  createPosts(postsData: PostDTO[]) {
    try {
      const newPosts = this.postsRepository.create(postsData);
      const posts = this.postsRepository.save(newPosts);
      if (posts) {
        return {
          message: 'Posts Added',
          success: 1,
        };
      } else {
        return {
          errorMessage: `Posts not Added`,
          success: 0,
        };
      }
    } catch (err) {
      throw err;
    }
  }

  async getPosts(data: GetPostsDTO) {
    try {
      const p: number = data.page || 1;
      const limit: number = 30;
      const offset = (p - 1) * limit;
      const posts = await this.postsRepository.find({
        order: { createdAt: 'DESC' },
        take: limit,
        skip: offset,
      });

      if (posts) {
        return {
          message: posts,
          success: 1,
        };
      } else {
        return {
          errorMessage: `Unable to get posts`,
          success: 0,
        };
      }
    } catch (err) {
      throw err;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }
}
