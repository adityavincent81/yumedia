import FollowingPageClient from "@/components/follow/FollowingPageClient";

interface FollowingPageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function FollowingPage({
  params,
}: FollowingPageProps) {
  const { username } =
    await params;

  return (
    <FollowingPageClient
      username={username}
    />
  );
}