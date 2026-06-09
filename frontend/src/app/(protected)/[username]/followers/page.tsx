import FollowersPageClient from "@/components/follow/FollowersPageClient";

interface FollowersPageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function FollowersPage({
  params,
}: FollowersPageProps) {
  const { username } =
    await params;

  return (
    <FollowersPageClient
      username={username}
    />
  );
}