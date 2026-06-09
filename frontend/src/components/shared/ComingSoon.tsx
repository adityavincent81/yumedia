import { ReactNode } from "react";

import {
  Badge,
  Button,
  Card,
} from "@/components/ui";

interface ComingSoonProps {
  title?: string;

  description?: string;

  icon?: ReactNode;

  showBackButton?: boolean;

  onBack?: () => void;

  phase?: string;

  estimated?: string;
}

export default function ComingSoon({
  title = "Coming Soon",
  description = "This feature is currently being developed and will be available in a future Yumedia update.",
  icon,
  showBackButton = false,
  onBack,
  phase = "Phase 2",
  estimated = "In Development",
}: ComingSoonProps) {
  return (
    <div
      className="
        flex
        min-h-[70vh]
        items-center
        justify-center

        px-4
        py-10
      "
    >
      <Card
        className="
          relative

          w-full
          max-w-2xl

          overflow-hidden

          border-white/10

          bg-white/[0.03]

          backdrop-blur-xl
        "
        padding="lg"
      >
        {/* Glow */}
        <div
          className="
            absolute
            inset-x-0
            top-0

            h-px

            bg-gradient-to-r
            from-transparent
            via-cyan-500
            to-transparent
          "
        />

        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <div
            className="
              mb-6

              flex
              h-24
              w-24
              items-center
              justify-center

              rounded-3xl

              border
              border-cyan-500/20

              bg-cyan-500/10

              text-5xl

              shadow-[0_0_60px_rgba(6,182,212,0.15)]
            "
          >
            {icon ?? "🚀"}
          </div>

          {/* Status */}
          <div className="mb-4 flex gap-2">
            <Badge variant="primary">
              {phase}
            </Badge>

            <Badge variant="secondary">
              {estimated}
            </Badge>
          </div>

          {/* Title */}
          <h1
            className="
              text-4xl
              font-bold
              tracking-tight
              text-white
            "
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className="
              mt-4
              max-w-xl

              text-base
              leading-relaxed

              text-zinc-400
            "
          >
            {description}
          </p>

          {/* Progress */}
          <div className="mt-8 w-full max-w-md">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-zinc-500">
                Development Progress
              </span>

              <span className="text-sm text-cyan-400">
                Planned
              </span>
            </div>

            <div
              className="
                h-2
                overflow-hidden

                rounded-full

                bg-zinc-800
              "
            >
              <div
                className="
                  h-full
                  w-[35%]

                  rounded-full

                  bg-gradient-to-r
                  from-cyan-500
                  to-orange-500
                "
              />
            </div>
          </div>

          {/* Footer */}
          <div
            className="
              mt-8

              rounded-2xl

              border
              border-white/5

              bg-white/[0.03]

              px-5
              py-4

              text-sm
              text-zinc-500
            "
          >
            Yumedia is continuously evolving.
            New features will be released
            gradually throughout development.
          </div>

          {showBackButton && (
            <Button
              className="mt-8"
              variant="outline"
              onClick={onBack}
            >
              Go Back
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}