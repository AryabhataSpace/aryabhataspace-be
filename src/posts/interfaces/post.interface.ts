import { PostCategory } from '../post-category.enum';

export type ReactionType = 'like' | 'celebrate' | 'support' | 'insightful' | 'inspiring';

export interface ReactionCounts {
  like: number;
  celebrate: number;
  support: number;
  insightful: number;
  inspiring: number;
}

export interface PostComment {
  id: string;
  postId: string;
  parentCommentId?: string | null;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  likesCount: number;
  userLiked?: boolean;
  replies?: PostComment[];
}

export interface PostReaction {
  id: string;
  postId: string;
  memberId: string;
  memberName: string;
  type: ReactionType;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  category: PostCategory | string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  tags?: string[];
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'document';
  pinned?: boolean;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
  reactionCounts: ReactionCounts;
  commentCount: number;
  userReaction?: ReactionType | null;
  comments?: PostComment[];
}

export interface PostAnalytics {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalComments: number;
  totalReactions: number;
  engagementRate: number;
  categoryBreakdown: { category: string; count: number; percentage: number }[];
  topEngagedPosts: { id: string; title: string; category: string; engagement: number }[];
}
