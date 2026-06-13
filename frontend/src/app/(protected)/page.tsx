"use client";

import CreatePostModal from "@/components/post/CreatePostModal";
import PostDetailModal from "@/components/post/PostDetailModal";

import FeedList from "@/components/feed/FeedList";

import StoryRingList from "@/components/story/StoryRingList";
import StoryViewer from "@/components/story/StoryViewer";
import CreateStoryModal from "@/components/story/CreateStoryModal";

import RightSidebar from "@/components/layout/MainLayout/RightSidebar";

export default function DashboardPage() {
  return (
    <>
      {/* Post */}

      <CreatePostModal />

      <PostDetailModal />

      {/* Story */}

      <CreateStoryModal />

      <StoryViewer />

      <main className="min-h-screen bg-black text-white">
        <div
          className="
            mx-auto
            flex
            max-w-[1800px]
            gap-8
          "
        >
          {/* Feed Area */}

          <div
            className="
              flex-1
              min-w-0
              p-8
            "
          >
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
          </div>

          {/* Right Sidebar */}

          <RightSidebar />
        </div>
      </main>
    </>
  );
}