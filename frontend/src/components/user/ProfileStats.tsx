interface ProfileStatsProps {
  username: string;

  postsCount: number;

  followersCount: number;

  followingCount: number;

  onFollowersClick?: () => void;

  onFollowingClick?: () => void;
}

export default function ProfileStats({
  postsCount,
  followersCount,
  followingCount,
  onFollowersClick,
  onFollowingClick,
}: ProfileStatsProps) {
  return (
    <div className="flex items-center gap-6">
      {/* Posts */}
      <div>
        <div className="font-semibold">
          {postsCount}
        </div>

        <div className="text-sm text-muted-foreground">
          Posts
        </div>
      </div>

      {/* Followers */}
      <button
        type="button"
        onClick={onFollowersClick}
        className="
          text-left
          transition-opacity
          hover:opacity-80
        "
      >
        <div className="font-semibold">
          {followersCount}
        </div>

        <div className="text-sm text-muted-foreground">
          Followers
        </div>
      </button>

      {/* Following */}
      <button
        type="button"
        onClick={onFollowingClick}
        className="
          text-left
          transition-opacity
          hover:opacity-80
        "
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