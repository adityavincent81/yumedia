"use client";

export default function CollectionSkeleton() {
  return (
    <div
      className="
        grid
        gap-6

        sm:grid-cols-2
        lg:grid-cols-3
      "
    >
      {Array.from({
        length: 6,
      }).map((_, index) => (
        <div
          key={index}
          className="
            overflow-hidden
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-900
          "
        >
          {/* Cover */}
          <div
            className="
              aspect-[4/3]
              animate-pulse
              bg-zinc-800
            "
          />

          {/* Content */}
          <div
            className="
              space-y-3
              p-4
            "
          >
            <div
              className="
                h-5
                w-2/3
                animate-pulse
                rounded
                bg-zinc-800
              "
            />

            <div
              className="
                h-4
                w-full
                animate-pulse
                rounded
                bg-zinc-800
              "
            />

            <div
              className="
                h-4
                w-3/4
                animate-pulse
                rounded
                bg-zinc-800
              "
            />

            <div
              className="
                flex
                items-center
                justify-between
                pt-2
              "
            >
              <div
                className="
                  h-4
                  w-16
                  animate-pulse
                  rounded
                  bg-zinc-800
                "
              />

              <div
                className="
                  h-4
                  w-20
                  animate-pulse
                  rounded
                  bg-zinc-800
                "
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}