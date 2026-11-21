"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { AutoVideo } from "@/components/wedding/auto-video";
import { Cover } from "@/components/wedding/cover";
import { Gallery } from "@/components/wedding/gallery";
import { MEDIA } from "@/components/wedding/media";
import { MusicPlayer } from "@/components/wedding/music-player";
import { Rsvp } from "@/components/wedding/rsvp";

export default function WeddingInvitation() {
  const [showCover, setShowCover] = useState(true);

  // Selama cover (slide 1) tampil: paksa posisi scroll ke atas dan
  // kunci scroll, supaya tidak terlihat konten tengah/bawah halaman
  useEffect(() => {
    if (showCover) {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      window.scrollTo(0, 0);
    }
  }, [showCover]);

  function handleOpen() {
    // Langsung tutup cover: AnimatePresence menjalankan animasi keluar
    // (fade + blur) dan melepas cover dari DOM setelah animasinya selesai
    setShowCover(false);
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#1d0f0d]">
      {/* Kolom undangan: lebar penuh di ponsel, berbingkai di layar besar */}
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-[#f3edda] shadow-[0_0_60px_rgba(0,0,0,0.55)]">
        <main className="flex-1">
          {/* Slide 2 — Selamat Datang */}
          <section aria-label="Selamat datang">
            <AutoVideo src={MEDIA.welcome} eager />
          </section>

          {/* Slide 3 — Bride & Groom */}
          <section aria-label="Mempelai">
            <AutoVideo src={MEDIA.couple} />
          </section>

          {/* Slide 4 — Akad & Resepsi */}
          <section aria-label="Detail acara">
            <AutoVideo src={MEDIA.event} />
          </section>

          {/* Slide 5 — Our Gallery */}
          <Gallery />

          {/* Slide 6 — Tanda Kasih */}
          <section aria-label="Tanda kasih">
            <AutoVideo src={MEDIA.gift} />
          </section>

          {/* Slide 7 — RSVP & Ucapan */}
          <Rsvp />

          {/* Slide 8 — Penutup */}
          <section aria-label="Penutup">
            <AutoVideo src={MEDIA.closing} />
          </section>
        </main>

        <footer className="mt-auto border-t border-[#6d1a24]/20 bg-[#f3edda] px-6 py-6 text-center">
          <p className="font-script text-2xl text-[#6d1a24]">
            Maestro &amp; Farida
          </p>
          <p className="mt-1 flex items-center justify-center gap-1.5 font-wed text-xs uppercase tracking-[0.25em] text-[#8a7561]">
            #MaestroFaridaDay
          </p>
          <p className="mt-3 flex items-center justify-center gap-1.5 font-wed text-xs text-[#a8977d]">
            Dibuat dengan
            <Heart
              className="h-3.5 w-3.5 fill-[#6d1a24] text-[#6d1a24]"
              aria-hidden="true"
            />
            untuk hari bahagia kami
          </p>
        </footer>
      </div>

      {/* Musik latar: mulai otomatis saat masuk slide 2 */}
      <MusicPlayer shouldPlay={!showCover} />

      {/* Slide 1 — Cover (hilang setelah tombol Buka ditekan) */}
      <AnimatePresence>
        {showCover && <Cover onOpen={handleOpen} />}
      </AnimatePresence>
    </div>
  );
}
