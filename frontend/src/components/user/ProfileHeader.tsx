import ProfileAvatar from "./ProfileAvatar";
import ProfileCover from "./ProfileCover";
import ProfileStats from "./ProfileStats";

import type { User } from "@/features/user/types/user.types";

interface ProfileHeaderProps {
  user: User;

  isOwner?: boolean;

  onEditProfile?: () => void;

  onFollow?: () => void;
}

export default function ProfileHeader({
  user,
  isOwner = false,
  onEditProfile,
  onFollow,
}: ProfileHeaderProps) {
  return (
    <div className="overflow-hidden rounded-xl">
      <ProfileCover
        coverUrl={user.cover?.url}
      />

      <div className="px-6 pb-6">
        <div className="-mt-16 mb-4">
          <ProfileAvatar
            avatarUrl={user.avatar?.url}
            fullName={user.fullName}
            size={128}
            className="border-4 border-background"
          />
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <div>
              <h1 className="text-2xl font-bold">
                {user.fullName}
              </h1>

              <p className="text-muted-foreground">
                @{user.username}
              </p>
            </div>

            {user.bio && (
              <p className="max-w-2xl whitespace-pre-wrap">
                {user.bio}
              </p>
            )}

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {user.location && (
                <span>
                  📍 {user.location}
                </span>
              )}

              {user.website && (
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  🌐 {user.website}
                </a>
              )}
            </div>

            <ProfileStats
              postsCount={
                user.postsCount
              }
              followersCount={
                user.followersCount
              }
              followingCount={
                user.followingCount
              }
            />
          </div>

          <div>
            {isOwner ? (
              <button
                type="button"
                onClick={
                  onEditProfile
                }
                className="rounded-lg border px-4 py-2 font-medium"
              >
                Edit Profile
              </button>
            ) : (
              <button
                type="button"
                onClick={onFollow}
                className="rounded-lg border px-4 py-2 font-medium"
              >
                Follow
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}