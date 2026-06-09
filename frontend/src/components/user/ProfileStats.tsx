interface ProfileStatsProps {
  postsCount: number;

  followersCount: number;

  followingCount: number;

  onPostsClick?: () => void;

  onFollowersClick?: () => void;

  onFollowingClick?: () => void;
}

export default function ProfileStats({
  postsCount,
  followersCount,
  followingCount,
  onPostsClick,
  onFollowersClick,
  onFollowingClick,
}: ProfileStatsProps) {
  return (
    <div className="flex items-center gap-6">
      <button
        type="button"
        onClick={onPostsClick}
        className="text-left"
      >
        <div className="font-semibold">
          {postsCount}
        </div>

        <div className="text-sm text-muted-foreground">
          Posts
        </div>
      </button>

      <button
        type="button"
        onClick={onFollowersClick}
        className="text-left"
      >
        <div className="font-semibold">
          {followersCount}
        </div>

        <div className="text-sm text-muted-foreground">
          Followers
        </div>
      </button>

      <button
        type="button"
        onClick={onFollowingClick}
        className="text-left"
      >
        <div className="font-semibold">
          {followingCount}
        </div>

        <div className="text-sm text-muted-foreground">
          Following
        </div>
      </button>
    </div>
  );
}