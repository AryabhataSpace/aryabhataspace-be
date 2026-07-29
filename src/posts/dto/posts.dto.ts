import { PostCategory } from '../post-category.enum';
import { ReactionType } from '../interfaces/post.interface';

export class CreatePostDto {
  title!: string;
  content!: string;
  category!: PostCategory | string;
  tags?: string[];
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'document';
  pinned?: boolean;
  status?: 'published' | 'draft';
}

export class UpdatePostDto {
  title?: string;
  content?: string;
  category?: PostCategory | string;
  tags?: string[];
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'document';
  pinned?: boolean;
  status?: 'published' | 'draft';
}

export class AddCommentDto {
  content!: string;
  parentCommentId?: string;
  authorName?: string;
  authorRole?: string;
}

export class ToggleReactionDto {
  type!: ReactionType;
  memberId?: string;
  memberName?: string;
}
