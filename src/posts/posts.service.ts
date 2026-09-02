import { Injectable, NotFoundException } from '@nestjs/common';
import { Post, PostComment, PostReaction, PostAnalytics, ReactionType } from './interfaces/post.interface';
import { CreatePostDto, UpdatePostDto, AddCommentDto, ToggleReactionDto } from './dto/posts.dto';
import { PostCategory, POST_CATEGORIES } from './post-category.enum';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    {
      id: 'post-101',
      title: 'Indigenous Cryogenic Engine E12 High-Altitude Static Test Successful',
      content: `We are thrilled to announce the successful 500-second static fire test of the E12 Cryogenic Engine at our Mahendragiri Propulsion Test Facility. 

This test validated liquid hydrogen and oxygen propellant flow stability under vacuum pressure conditions. Congratulations to the propulsion research team across all partner institutes!

Key Technical Highlights:
• Vacuum Thrust: 75 kN
• Specific Impulse: 442 s
• Regenerative Cooling Assembly: 3D printed Nickel Alloy IN718

We invite young mechanical and aerospace researchers to apply for the upcoming propulsion development cycle.`,
      category: PostCategory.TECHNOLOGY,
      authorName: 'Aryabhata Space Admin',
      authorRole: 'Chief Propulsion Researcher',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      tags: ['Propulsion', 'Cryogenics', 'Rocketry', 'Testing'],
      mediaUrl: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1000&q=80',
      mediaType: 'image',
      pinned: true,
      status: 'published',
      createdAt: '2026-07-28T10:15:00Z',
      updatedAt: '2026-07-28T10:15:00Z',
      reactionCounts: {
        like: 42,
        celebrate: 28,
        support: 14,
        insightful: 31,
        inspiring: 19
      },
      commentCount: 4,
      userReaction: null,
      comments: [
        {
          id: 'comm-1',
          postId: 'post-101',
          parentCommentId: null,
          authorName: 'Rohan Sharma',
          authorRole: 'Thermal Systems Engineer',
          authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
          content: 'Incredible achievement! Was the IN718 combustion chamber fabricated using Selective Laser Melting (SLM)?',
          createdAt: '2026-07-28T11:02:00Z',
          likesCount: 9,
          userLiked: false,
          replies: [
            {
              id: 'comm-1-reply-1',
              postId: 'post-101',
              parentCommentId: 'comm-1',
              authorName: 'Aryabhata Space Admin',
              authorRole: 'Propulsion Lead',
              authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
              content: 'Yes Rohan! Direct Metal Laser Sintering (DMLS) with custom conformal cooling channels.',
              createdAt: '2026-07-28T11:45:00Z',
              likesCount: 6,
              userLiked: false
            }
          ]
        },
        {
          id: 'comm-2',
          postId: 'post-101',
          parentCommentId: null,
          authorName: 'Priya Sundaram',
          authorRole: 'Aerospace Systems Student',
          authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
          content: 'Can student fellows participate in the upcoming thrust chamber analysis workshop next month?',
          createdAt: '2026-07-28T12:30:00Z',
          likesCount: 4,
          userLiked: false,
          replies: []
        }
      ]
    },
    {
      id: 'post-102',
      title: 'National Call for Applications: 2026 Space Hardware Machining & Precision Manufacturing Traineeship',
      content: `Applications are officially open for our 6-month hands-on Precision Machining & Aerospace Fabrication Fellowship!

Who can apply?
Graduates and final-year students from Mechanical, Metallurgy, Production, Electrical, and Mechatronics engineering disciplines across the nation.

Selected candidates will work on multi-axis CNC milling, electron beam welding (EBW), and ultra-clean room assembly for satellite structural frames.

Application Deadline: August 25, 2026`,
      category: PostCategory.TRAINING,
      authorName: 'Aryabhata Space Admin',
      authorRole: 'Director of Human Capital & Talent Recruitment',
      authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      tags: ['Machining', 'Fellowship', 'PrecisionEngineering', 'Training'],
      mediaUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
      mediaType: 'image',
      pinned: false,
      status: 'published',
      createdAt: '2026-07-27T08:30:00Z',
      updatedAt: '2026-07-27T08:30:00Z',
      reactionCounts: {
        like: 65,
        celebrate: 40,
        support: 22,
        insightful: 18,
        inspiring: 35
      },
      commentCount: 2,
      userReaction: null,
      comments: [
        {
          id: 'comm-3',
          postId: 'post-102',
          parentCommentId: null,
          authorName: 'Anil Kumar',
          authorRole: 'Production Engineer',
          authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
          content: 'This is an excellent opportunity for non-aerospace mechanical engineers to transition into space manufacturing!',
          createdAt: '2026-07-27T09:15:00Z',
          likesCount: 12,
          userLiked: false,
          replies: []
        }
      ]
    },
    {
      id: 'post-103',
      title: 'QA/QC Protocols for Spacecraft Electronics & Thermal Vacuum Qualification',
      content: `Quality Assurance and Quality Control (QA/QC) are the backbone of space mission success. A single cold-solder joint or ungrounded sensor line can jeopardize a multi-year orbital mission.

In our latest technical technical release, we detail:
1. Thermal Vacuum (TVAC) screening protocols (-120°C to +150°C).
2. X-ray non-destructive testing for PCB ball grid arrays (BGAs).
3. Outgassing standards under 10^-6 Torr vacuum.

Read full guidelines in our technical repository.`,
      category: PostCategory.QA_QC,
      authorName: 'Aryabhata Space Admin',
      authorRole: 'Quality & Reliability Assurance Group',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      tags: ['QAQC', 'Reliability', 'Testing', 'SpacecraftElectronics'],
      mediaUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
      mediaType: 'image',
      pinned: false,
      status: 'published',
      createdAt: '2026-07-26T14:20:00Z',
      updatedAt: '2026-07-26T14:20:00Z',
      reactionCounts: {
        like: 38,
        celebrate: 12,
        support: 19,
        insightful: 45,
        inspiring: 10
      },
      commentCount: 1,
      userReaction: null,
      comments: []
    },
    {
      id: 'post-104',
      title: 'International Deputations: 4 Research Engineers Selected for CNES Space Optics Exchange',
      content: `We proudly congratulate 4 candidate engineers from Aryabhata Space network selected for the 2026 Indo-French Space Optics Research Deputation program in Toulouse, France.

They will spend 9 months collaborating on next-generation hyperspectral payload mirror design and optical alignment.

Wish our deputed engineers all the success!`,
      category: PostCategory.ABROAD_WORK,
      authorName: 'Aryabhata Space Admin',
      authorRole: 'International Collaborations Division',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      tags: ['AbroadWork', 'Deputations', 'Optics', 'GlobalPartnership'],
      mediaUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
      mediaType: 'image',
      pinned: false,
      status: 'published',
      createdAt: '2026-07-25T16:45:00Z',
      updatedAt: '2026-07-25T16:45:00Z',
      reactionCounts: {
        like: 89,
        celebrate: 95,
        support: 34,
        insightful: 20,
        inspiring: 68
      },
      commentCount: 3,
      userReaction: null,
      comments: []
    }
  ];

  private userReactionsMap: Map<string, PostReaction> = new Map(); // key: `postId:memberId`

  // Member API: Get all published posts
  getPosts(category?: string, search?: string, sort: 'latest' | 'popular' = 'latest'): Post[] {
    let filtered = this.posts.filter(p => p.status === 'published');

    if (category && category !== 'All') {
      filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    if (sort === 'popular') {
      filtered.sort((a, b) => {
        const totalA = (a.reactionCounts.like + a.reactionCounts.celebrate + a.reactionCounts.support + a.reactionCounts.insightful + a.reactionCounts.inspiring) + a.commentCount * 2;
        const totalB = (b.reactionCounts.like + b.reactionCounts.celebrate + b.reactionCounts.support + b.reactionCounts.insightful + b.reactionCounts.inspiring) + b.commentCount * 2;
        return totalB - totalA;
      });
    } else {
      // Sort pinned first, then latest
      filtered.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    }

    return filtered;
  }

  // Admin API: Get all posts including drafts
  getAdminPosts(): Post[] {
    return [...this.posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  getPostById(id: string): Post {
    const post = this.posts.find(p => p.id === id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  createPost(dto: CreatePostDto): Post {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      title: dto.title,
      content: dto.content,
      category: dto.category,
      authorName: 'Aryabhata Space Admin',
      authorRole: 'Platform Administrator',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      tags: dto.tags || [dto.category.toString().replace(/\s+/g, '')],
      mediaUrl: dto.mediaUrl,
      mediaType: dto.mediaType || 'image',
      pinned: dto.pinned || false,
      status: dto.status || 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      reactionCounts: {
        like: 0,
        celebrate: 0,
        support: 0,
        insightful: 0,
        inspiring: 0
      },
      commentCount: 0,
      userReaction: null,
      comments: []
    };

    this.posts.unshift(newPost);
    return newPost;
  }

  updatePost(id: string, dto: UpdatePostDto): Post {
    const post = this.getPostById(id);
    if (dto.title !== undefined) post.title = dto.title;
    if (dto.content !== undefined) post.content = dto.content;
    if (dto.category !== undefined) post.category = dto.category;
    if (dto.tags !== undefined) post.tags = dto.tags;
    if (dto.mediaUrl !== undefined) post.mediaUrl = dto.mediaUrl;
    if (dto.mediaType !== undefined) post.mediaType = dto.mediaType;
    if (dto.pinned !== undefined) post.pinned = dto.pinned;
    if (dto.status !== undefined) post.status = dto.status;
    post.updatedAt = new Date().toISOString();

    return post;
  }

  deletePost(id: string): { success: boolean } {
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    this.posts.splice(index, 1);
    return { success: true };
  }

  togglePostReaction(postId: string, type: ReactionType, memberId = 'member-default'): Post {
    const post = this.getPostById(postId);
    const key = `${postId}:${memberId}`;
    const existing = this.userReactionsMap.get(key);

    if (existing) {
      // Decrement existing reaction count
      if (post.reactionCounts[existing.type] > 0) {
        post.reactionCounts[existing.type]--;
      }

      if (existing.type === type) {
        // Un-reacted
        this.userReactionsMap.delete(key);
        post.userReaction = null;
      } else {
        // Changed reaction type
        post.reactionCounts[type]++;
        this.userReactionsMap.set(key, { ...existing, type });
        post.userReaction = type;
      }
    } else {
      // New reaction
      post.reactionCounts[type]++;
      this.userReactionsMap.set(key, {
        id: `react-${Date.now()}`,
        postId,
        memberId,
        memberName: 'Member Engineer',
        type,
        createdAt: new Date().toISOString()
      });
      post.userReaction = type;
    }

    return post;
  }

  getPostComments(postId: string): PostComment[] {
    const post = this.getPostById(postId);
    return post.comments || [];
  }

  addComment(postId: string, dto: AddCommentDto, memberName = 'Candidate Engineer', memberRole = 'Member Candidate'): PostComment {
    const post = this.getPostById(postId);
    const newComment: PostComment = {
      id: `comm-${Date.now()}`,
      postId,
      parentCommentId: dto.parentCommentId || null,
      authorName: dto.authorName || memberName,
      authorRole: dto.authorRole || memberRole,
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      content: dto.content,
      createdAt: new Date().toISOString(),
      likesCount: 0,
      userLiked: false,
      replies: []
    };

    if (!post.comments) {
      post.comments = [];
    }

    if (dto.parentCommentId) {
      // Find parent comment and append reply
      const parent = this.findCommentRecursive(post.comments, dto.parentCommentId);
      if (parent) {
        if (!parent.replies) parent.replies = [];
        parent.replies.push(newComment);
      } else {
        post.comments.push(newComment);
      }
    } else {
      post.comments.push(newComment);
    }

    post.commentCount = this.calculateTotalComments(post.comments);
    return newComment;
  }

  likeComment(postId: string, commentId: string): PostComment {
    const post = this.getPostById(postId);
    if (!post.comments) throw new NotFoundException('Comments not found');

    const comment = this.findCommentRecursive(post.comments, commentId);
    if (!comment) throw new NotFoundException(`Comment with ID ${commentId} not found`);

    if (comment.userLiked) {
      comment.likesCount = Math.max(0, comment.likesCount - 1);
      comment.userLiked = false;
    } else {
      comment.likesCount++;
      comment.userLiked = true;
    }

    return comment;
  }

  getAnalytics(): PostAnalytics {
    const totalPosts = this.posts.length;
    const publishedPosts = this.posts.filter(p => p.status === 'published').length;
    const draftPosts = this.posts.filter(p => p.status === 'draft').length;

    let totalComments = 0;
    let totalReactions = 0;

    const categoryMap: { [cat: string]: number } = {};
    POST_CATEGORIES.forEach(c => (categoryMap[c] = 0));

    this.posts.forEach(p => {
      totalComments += p.commentCount;
      const rxSum = p.reactionCounts.like + p.reactionCounts.celebrate + p.reactionCounts.support + p.reactionCounts.insightful + p.reactionCounts.inspiring;
      totalReactions += rxSum;

      if (categoryMap[p.category] !== undefined) {
        categoryMap[p.category]++;
      } else {
        categoryMap[p.category] = 1;
      }
    });

    const categoryBreakdown = Object.keys(categoryMap)
      .map(cat => ({
        category: cat,
        count: categoryMap[cat],
        percentage: totalPosts > 0 ? Math.round((categoryMap[cat] / totalPosts) * 100) : 0
      }))
      .filter(cb => cb.count > 0 || POST_CATEGORIES.slice(0, 10).includes(cb.category as any));

    const topEngagedPosts = [...this.posts]
      .map(p => {
        const eng = p.reactionCounts.like + p.reactionCounts.celebrate + p.reactionCounts.support + p.reactionCounts.insightful + p.reactionCounts.inspiring + (p.commentCount * 2);
        return { id: p.id, title: p.title, category: p.category, engagement: eng };
      })
      .sort((a, b) => b.engagement - a.engagement)
      .slice(0, 5);

    const engagementRate = totalPosts > 0 ? Math.round(((totalComments + totalReactions) / totalPosts) * 10) / 10 : 0;

    return {
      totalPosts,
      publishedPosts,
      draftPosts,
      totalComments,
      totalReactions,
      engagementRate,
      categoryBreakdown,
      topEngagedPosts
    };
  }

  private findCommentRecursive(comments: PostComment[], commentId: string): PostComment | null {
    for (const c of comments) {
      if (c.id === commentId) return c;
      if (c.replies && c.replies.length > 0) {
        const found = this.findCommentRecursive(c.replies, commentId);
        if (found) return found;
      }
    }
    return null;
  }

  private calculateTotalComments(comments: PostComment[]): number {
    let count = 0;
    for (const c of comments) {
      count++;
      if (c.replies && c.replies.length > 0) {
        count += this.calculateTotalComments(c.replies);
      }
    }
    return count;
  }
}
