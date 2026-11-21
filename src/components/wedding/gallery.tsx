"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AutoVideo } from "./auto-video";
import { GALLERY_IMAGES, MEDIA } from "./media";

export function Gallery() {
  const [selected, setSelected] = useState(0);

  return (
    <section
      id="galeri"
      className="relative overflow-hidden py-16"
      aria-label="Galeri foto"
    >
      {/* Wallpaper video */}
      <div className="absolute inset-0" aria-hidden="true">
        <AutoVideo
          src={MEDIA.wallpaper}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#f3edda]/45" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[430px] flex-col items-center gap-6 px-6">
        <div className="text-center">
          <h2 className="font-latin italic text-4xl text-[#6d1a24] drop-shadow-sm">
            Our Gallery
          </h2>
        </div>

        {/* Preview besar - bentuk arch sesuai tema undangan */}
        <div className="relative w-full max-w-[300px]">
          <div className="rounded-t-[9rem] rounded-b-2xl border border-[#c9a227]/60 bg-white/60 p-2 shadow-xl backdrop-blur-sm">
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-[8.5rem] rounded-b-xl">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <img
                    src={GALLERY_IMAGES[selected]}
                    alt={`Foto kenangan pernikahan ${selected + 1}`}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Preview kecil - klik untuk menampilkan di preview besar */}
        <div
          className="grid w-full max-w-[340px] grid-cols-5 gap-2"
          role="listbox"
          aria-label="Pilih foto untuk ditampilkan"
        >
          {GALLERY_IMAGES.map((src, i) => (
            <button
              key={src}
              role="option"
              aria-selected={selected === i}
              aria-label={`Tampilkan foto ${i + 1}`}
              onClick={() => setSelected(i)}
              className={`group relative aspect-[3/4] overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                selected === i
                  ? "border-[#c9a227] shadow-lg ring-2 ring-[#c9a227]/40"
                  : "border-white/70 opacity-80 hover:opacity-100 hover:shadow-md"
              }`}
            >
              <img
                src={src}
                alt={`Thumbnail foto ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {selected === i && (
                <span className="absolute inset-0 bg-[#6d1a24]/10" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
