import { Module } from '@nestjs/common';
import { PostsController, AdminPostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController, AdminPostsController],
  providers: [PostsService],
  exports: [PostsService]
})
export class PostsModule {}
