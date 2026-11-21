"use client";

import { useEffect, useRef, useState } from "react";
import { Disc3, VolumeX } from "lucide-react";

type MusicPlayerProps = {
  /** true = undangan sudah dibuka (masuk slide 2), musik mulai otomatis */
  shouldPlay: boolean;
};

/**
 * Musik latar "Dayuang Palinggam" (talempong instrumental Minangkabau).
 * Mulai otomatis ketika tamu menekan tombol Buka (masuk slide 2),
 * dengan tombol melayang untuk play/pause.
 */
export function MusicPlayer({ shouldPlay }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  // Otomatis play begitu masuk slide 2 (setelah klik Buka).
  // Klik tombol Buka adalah interaksi pengguna, sehingga browser
  // mengizinkan audio dengan suara diputar.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !shouldPlay) return;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [shouldPlay]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/dayuang-palinggam.mp3"
        loop
        preload="auto"
      />

      {shouldPlay && (
        <button
          onClick={toggle}
          aria-label={playing ? "Matikan musik" : "Putar musik"}
          className="music-toggle fixed bottom-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a227]/70 bg-[#f7f1df]/95 text-[#6d1a24] shadow-xl backdrop-blur-sm transition-colors duration-300 hover:bg-[#6d1a24] hover:text-[#f7f1df] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a227]"
        >
          {playing ? (
            <Disc3
              className="h-6 w-6 animate-[spin_5s_linear_infinite]"
              aria-hidden="true"
            />
          ) : (
            <VolumeX className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      )}
    </>
  );
}
