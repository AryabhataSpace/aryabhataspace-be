import { Controller, Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto, AddCommentDto, ToggleReactionDto } from './dto/posts.dto';
import { POST_CATEGORIES } from './post-category.enum';

@Controller('api/v1/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(
    @Query('category') category?: string,
    @Query('search') search?: string,
    @Query('sort') sort?: 'latest' | 'popular',
  ) {
    return this.postsService.getPosts(category, search, sort);
  }

  @Get('categories')
  getCategories() {
    return POST_CATEGORIES;
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(id);
  }

  @Post(':id/react')
  reactToPost(@Param('id') id: string, @Body() dto: ToggleReactionDto) {
    return this.postsService.togglePostReaction(id, dto.type, dto.memberId);
  }

  @Get(':id/comments')
  getComments(@Param('id') id: string) {
    return this.postsService.getPostComments(id);
  }

  @Post(':id/comments')
  addComment(@Param('id') id: string, @Body() dto: AddCommentDto) {
    return this.postsService.addComment(id, dto);
  }

  @Post(':id/comments/:commentId/like')
  likeComment(@Param('id') id: string, @Param('commentId') commentId: string) {
    return this.postsService.likeComment(id, commentId);
  }
}

@Controller('api/v1/admin/posts')
export class AdminPostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getAdminPosts() {
    return this.postsService.getAdminPosts();
  }

  @Get('analytics')
  getAnalytics() {
    return this.postsService.getAnalytics();
  }

  @Post()
  createPost(@Body() dto: CreatePostDto) {
    return this.postsService.createPost(dto);
  }

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    return this.postsService.updatePost(id, dto);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id);
  }
}
