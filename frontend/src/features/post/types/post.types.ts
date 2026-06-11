export type PostVisibility =
  | "public"
  | "followers"
  | "private";

export type PostMediaType =
  | "image"
  | "video";

export interface PostAuthor {
  _id: string;

  username: string;

  fullName: string;

  avatar?: string | null;

  isVerified: boolean;
}

export interface PostMedia {
  type: PostMediaType;

  url: string;

  publicId: string;
}

export interface Post {
  _id: string;

  author: PostAuthor;

  caption: string;

  media: PostMedia[];

  hashtags: string[];

  visibility: PostVisibility;

  likesCount: number;

  commentsCount: number;

  savesCount: number;

  isSaved?: boolean;

  createdAt: string;

  updatedAt: string;
}

export interface CreatePostPayload {
  caption?: string;

  visibility?: PostVisibility;

  files?: File[];
}

export interface UpdatePostPayload {
  caption?: string;

  visibility?: PostVisibility;
}

export interface UserPostsParams {
  username: string;

  page?: number;

  limit?: number;
}

export interface PostQueryParams {
  page?: number;

  limit?: number;
}