"use client";

import { motion } from "framer-motion";
import { MailOpen } from "lucide-react";
import { MEDIA } from "./media";

type CoverProps = {
  onOpen: () => void;
};

export function Cover({ onOpen }: CoverProps) {
  return (
    <motion.div
      /* Tanpa initial opacity 0: cover langsung opaque sejak render
         pertama (SSR) agar konten di baliknya tidak terlihat sekejap
         saat halaman dimuat. Animasi hanya saat keluar (tombol Buka). */
      exit={{ opacity: 0, scale: 1.06, filter: "blur(6px)" }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-[#170c0a]"
      aria-label="Sampul undangan"
    >
      {/* Kolom tengah meniru bingkai undangan di layar besar */}
      <div className="relative mx-auto h-full w-full max-w-[430px] overflow-hidden shadow-2xl">
        <video
          src={MEDIA.cover}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />

        {/* Tombol Buka - tepat di bawah teks "Bapak/Ibu/Saudara/i" pada video */}
        <div className="cover-cta absolute left-1/2 z-10 -translate-x-1/2">
          <button
            onClick={onOpen}
            className="cover-cta-pulse group flex items-center gap-1.5 rounded-full border border-[#c9a227]/70 bg-[#f7f1df]/95 px-4 py-1.5 font-wed text-sm font-semibold tracking-wide text-[#6d1a24] shadow-xl backdrop-blur-sm transition-colors duration-300 hover:bg-[#6d1a24] hover:text-[#f7f1df] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9a227]"
          >
            <MailOpen
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-12"
              aria-hidden="true"
            />
            Buka
          </button>
          <span className="sr-only">
            Buka undangan untuk menuju halaman undangan pernikahan
          </span>
        </div>
      </div>
    </motion.div>
  );
}
