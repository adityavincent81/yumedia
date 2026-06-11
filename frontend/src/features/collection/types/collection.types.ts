export interface CollectionOwner {
  _id: string;

  username: string;

  fullName: string;

  avatar?: string;

  isVerified?: boolean;
}

export interface Collection {
  _id: string;

  owner: CollectionOwner;

  name: string;

  description: string;

  coverImage: string;

  isPrivate: boolean;

  postsCount: number;

  createdAt: string;

  updatedAt: string;
}

export interface CollectionPost {
  _id: string;

  collection: string;

  post: string;

  createdAt: string;

  updatedAt: string;
}

export interface CreateCollectionPayload {
  name: string;

  description?: string;

  coverImage?: string;

  isPrivate?: boolean;
}

export interface UpdateCollectionPayload {
  name?: string;

  description?: string;

  coverImage?: string;

  isPrivate?: boolean;
}

export interface AddPostToCollectionPayload {
  postId: string;
}

export interface CollectionPostsResponse<TPost> {
  collection: Collection;

  posts: TPost[];
}

export interface CollectionPagination {
  page: number;

  limit: number;

  total?: number;

  totalPages?: number;
}

export interface CollectionState {
  collections: Collection[];

  selectedCollection: Collection | null;

  collectionPosts: Record<
    string,
    unknown[]
  >;

  loading: boolean;

  createModalOpen: boolean;

  selectorModalOpen: boolean;

  selectedPostId: string | null;
}