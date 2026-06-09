"use client";

import { useEffect, useState } from "react";

interface YudhartaTypingProps {
  className?: string;
}

export default function YudhartaTyping({
  className = "",
}: YudhartaTypingProps) {
  const texts = [
    "UNIVERSITAS YUDHARTA PASURUAN",
    "東京大学スタイルシステム",
  ];

  const [text, setText] = useState("");

  const [index, setIndex] = useState(0);

  const [charIndex, setCharIndex] =
    useState(0);

  const [isDeleting, setIsDeleting] =
    useState(false);

  useEffect(() => {
    const current = texts[index];

    const speed = isDeleting
      ? 30
      : 60;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(
            current.substring(
              0,
              charIndex + 1
            )
          );

          setCharIndex(
            (value) => value + 1
          );

          if (
            charIndex + 1 ===
            current.length
          ) {
            setTimeout(
              () =>
                setIsDeleting(true),
              1200
            );
          }
        } else {
          setText(
            current.substring(
              0,
              charIndex - 1
            )
          );

          setCharIndex(
            (value) => value - 1
          );

          if (charIndex === 0) {
            setIsDeleting(false);

            setIndex(
              (value) =>
                (value + 1) %
                texts.length
            );
          }
        }
      },
      speed
    );

    return () =>
      clearTimeout(timeout);
  }, [
    charIndex,
    index,
    isDeleting,
    texts,
  ]);

  return (
    <div className={className}>
      <span
        className="
          text-xs
          font-medium
          tracking-[0.35em]
          text-white/40
        "
      >
        <span
          className="
            bg-gradient-to-r
            from-cyan-400
            to-orange-400

            bg-clip-text
            text-transparent
          "
        >
          {text}
        </span>

        <span
          className="
            ml-1
            animate-pulse
            text-orange-400
          "
        >
          |
        </span>
      </span>
    </div>
  );
}