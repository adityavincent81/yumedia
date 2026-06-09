import type { User } from "@/features/user/types/user.types";

interface ProfileAboutProps {
  user: User;
}

export default function ProfileAbout({
  user,
}: ProfileAboutProps) {
  return (
    <div className="rounded-xl border bg-background p-6">
      <h2 className="mb-6 text-lg font-semibold">
        About
      </h2>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">
            NIM
          </p>

          <p className="font-medium">
            {user.nim}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Faculty
          </p>

          <p className="font-medium">
            {user.faculty ||
              "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Major
          </p>

          <p className="font-medium">
            {user.major || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Batch Year
          </p>

          <p className="font-medium">
            {user.batchYear ||
              "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Joined
          </p>

          <p className="font-medium">
            {new Date(
              user.createdAt
            ).toLocaleDateString(
              "id-ID",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Last Seen
          </p>

          <p className="font-medium">
            {new Date(
              user.lastSeenAt
            ).toLocaleDateString(
              "id-ID",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </p>
        </div>
      </div>
    </div>
  );
}