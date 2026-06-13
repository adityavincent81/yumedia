"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { MessageCircle } from "lucide-react";

import ProfileAvatar from "./ProfileAvatar";
import ProfileCover from "./ProfileCover";
import ProfileStats from "./ProfileStats";

import FollowButton from "@/components/follow/FollowButton";

import FollowersModal from "@/components/follow/modal/FollowersModal";
import FollowingModal from "@/components/follow/modal/FollowingModal";

import { useMessageStore } from "@/features/message/store/message.store";

import type { User } from "@/features/user/types/user.types";

interface ProfileHeaderProps {
  user: User;

  isOwner?: boolean;

  onEditProfile?: () => void;
}

export default function ProfileHeader({
  user,
  isOwner = false,
  onEditProfile,
}: ProfileHeaderProps) {
  const router = useRouter();

  const [
    followersOpen,
    setFollowersOpen,
  ] = useState(false);

  const [
    followingOpen,
    setFollowingOpen,
  ] = useState(false);

  const [
    openingConversation,
    setOpeningConversation,
  ] = useState(false);

  const createConversation =
    useMessageStore(
      (state) =>
        state.createConversation
    );

  const setSelectedConversation =
    useMessageStore(
      (state) =>
        state.setSelectedConversation
    );

  const handleMessage =
    async () => {
      try {
        setOpeningConversation(
          true
        );

        const conversation =
          await createConversation({
            participantId:
              user._id,
          } as any);

        if (
          conversation
        ) {
          setSelectedConversation(
            conversation
          );
        }

        router.push(
          "/messages"
        );
      } catch (error) {
        console.error(
          "Failed to open conversation",
          error
        );
      } finally {
        setOpeningConversation(
          false
        );
      }
    };

  return (
    <>
      <div className="overflow-hidden rounded-xl">
        <ProfileCover
          coverUrl={user.cover?.url}
        />

        <div className="px-6 pb-6">
          <div className="-mt-16 mb-4">
            <ProfileAvatar
              avatarUrl={
                user.avatar?.url
              }
              fullName={
                user.fullName
              }
              size={128}
              className="
                border-4
                border-background
              "
            />
          </div>

          <div
            className="
              flex
              flex-col
              gap-4

              md:flex-row
              md:items-start
              md:justify-between
            "
          >
            <div className="space-y-3">
              <div>
                <h1
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  {user.fullName}
                </h1>

                <p
                  className="
                    text-muted-foreground
                  "
                >
                  @{user.username}
                </p>
              </div>

              {user.bio && (
                <p
                  className="
                    max-w-2xl
                    whitespace-pre-wrap
                  "
                >
                  {user.bio}
                </p>
              )}

              <div
                className="
                  flex
                  flex-wrap
                  gap-4
                  text-sm
                  text-muted-foreground
                "
              >
                {user.location && (
                  <span>
                    📍{" "}
                    {
                      user.location
                    }
                  </span>
                )}

                {user.website && (
                  <a
                    href={
                      user.website
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      hover:underline
                    "
                  >
                    🌐{" "}
                    {
                      user.website
                    }
                  </a>
                )}
              </div>

              <ProfileStats
                username={
                  user.username
                }
                postsCount={
                  user.postsCount
                }
                followersCount={
                  user.followersCount
                }
                followingCount={
                  user.followingCount
                }
                onFollowersClick={() =>
                  setFollowersOpen(
                    true
                  )
                }
                onFollowingClick={() =>
                  setFollowingOpen(
                    true
                  )
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
                  className="
                    rounded-lg
                    border
                    px-4
                    py-2
                    font-medium
                    transition-all
                    hover:bg-white/5
                  "
                >
                  Edit Profile
                </button>
              ) : (
                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-2
                  "
                >
                  <FollowButton
                    userId={
                      user._id
                    }
                  />

                  <button
                    type="button"
                    onClick={
                      handleMessage
                    }
                    disabled={
                      openingConversation
                    }
                    className="
                      flex
                      items-center
                      gap-2

                      rounded-lg
                      border

                      px-4
                      py-2

                      font-medium

                      transition-all

                      hover:bg-white/5

                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    <MessageCircle
                      size={16}
                    />

                    <span>
                      {openingConversation
                        ? "Opening..."
                        : "Message"}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <FollowersModal
        open={followersOpen}
        onClose={() =>
          setFollowersOpen(
            false
          )
        }
        username={
          user.username
        }
      />

      <FollowingModal
        open={followingOpen}
        onClose={() =>
          setFollowingOpen(
            false
          )
        }
        username={
          user.username
        }
      />
    </>
  );
}