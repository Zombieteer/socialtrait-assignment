import { Module } from '@nestjs/common';
import { ScrapHnService } from './getHNPosts.service';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [PostsModule],
  providers: [ScrapHnService],
})
export class ScriptsModule {}
