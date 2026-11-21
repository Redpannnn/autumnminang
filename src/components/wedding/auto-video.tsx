"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type AutoVideoProps = {
  src: string;
  className?: string;
  eager?: boolean;
};

/**
 * Video yang otomatis play ketika terlihat di viewport
 * dan pause ketika keluar viewport (hemat bandwidth & CPU).
 */
export function AutoVideo({ src, className, eager = false }: AutoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.2 }
    );

    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload={eager ? "auto" : "metadata"}
      className={cn("block w-full h-auto", className)}
    />
  );
}
