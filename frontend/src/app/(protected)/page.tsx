"use client";

import CreatePostModal from "@/components/post/CreatePostModal";
import PostDetailModal from "@/components/post/PostDetailModal";

import FeedList from "@/components/feed/FeedList";

import StoryRingList from "@/components/story/StoryRingList";
import StoryViewer from "@/components/story/StoryViewer";
import CreateStoryModal from "@/components/story/CreateStoryModal";

export default function DashboardPage() {

  return (
    <>
      {/* Post */}

      <CreatePostModal />

      <PostDetailModal />

      {/* Story */}

      <CreateStoryModal />

      <StoryViewer />

      <main className="min-h-screen bg-black p-8 text-white">
        <div className="mx-auto max-w-3xl space-y-6">

          {/* Stories */}

          <section
            className="
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-900
              py-2
            "
          >
            <StoryRingList />
          </section>

          {/* Feed */}

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">
              Home Feed
            </h2>

            <FeedList />
          </section>
        </div>
      </main>
    </>
  );
}