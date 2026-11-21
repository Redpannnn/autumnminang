"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, MessageCircleHeart, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { AutoVideo } from "./auto-video";
import { ATTENDANCE_LABELS, MEDIA, type WishItem } from "./media";

const ATTENDANCE_OPTIONS = [
  { value: "HADIR", label: "Hadir" },
  { value: "TIDAK_HADIR", label: "Tidak Hadir" },
  { value: "RAGU", label: "Masih Ragu" },
] as const;

const ATTENDANCE_BADGE: Record<string, string> = {
  HADIR: "bg-emerald-800 text-emerald-50",
  TIDAK_HADIR: "bg-stone-600 text-stone-50",
  RAGU: "bg-amber-700 text-amber-50",
};

function formatTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function Rsvp() {
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<string>("HADIR");
  const [message, setMessage] = useState("");

  const loadWishes = useCallback(async () => {
    try {
      const res = await fetch("/api/wishes", { cache: "no-store" });
      if (!res.ok) throw new Error("gagal memuat");
      const data = (await res.json()) as { wishes: WishItem[] };
      setWishes(data.wishes);
      setError(null);
    } catch {
      setError("Gagal memuat ucapan. Coba refresh halaman.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWishes();
  }, [loadWishes]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      toast.error("Mohon isi nama dan ucapan terlebih dahulu.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, attendance, message }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.error ?? "Gagal mengirim ucapan.");
        return;
      }

      setWishes((prev) => [data.wish as WishItem, ...prev]);
      setMessage("");
      toast.success("Terima kasih! Ucapan Anda sudah terkirim.");
    } catch {
      toast.error("Terjadi kesalahan jaringan. Coba lagi ya.");
    } finally {
      setSubmitting(false);
    }
  }

  const totalHadir = wishes.filter((w) => w.attendance === "HADIR").length;

  return (
    <section
      id="rsvp"
      className="relative overflow-hidden py-16"
      aria-label="RSVP dan ucapan"
    >
      {/* Wallpaper video */}
      <div className="absolute inset-0" aria-hidden="true">
        <AutoVideo
          src={MEDIA.wallpaper}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#f3edda]/50" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[430px] flex-col items-center gap-6 px-5">
        <div className="text-center">
          <h2 className="font-latin italic text-4xl text-[#6d1a24] drop-shadow-sm">
            RSVP
          </h2>
          <p className="mt-1.5 font-wed text-[13px] italic text-[#5b4636]">
            Kehadiran dan doa restu Anda adalah hadiah terindah bagi kami.
          </p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onSubmit={handleSubmit}
          className="w-full rounded-2xl border border-[#c9a227]/50 bg-[#faf5e6]/95 p-5 shadow-xl backdrop-blur-sm"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="rsvp-name"
                className="font-wed text-xs font-semibold text-[#5b4636]"
              >
                Nama
              </Label>
              <Input
                id="rsvp-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                placeholder="Nama Anda / keluarga"
                className="border-[#d8c9a5] bg-white/80 font-wed text-sm text-[#43302a] placeholder:text-[#a8977d] focus-visible:ring-[#6d1a24]/40"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="font-wed text-xs font-semibold text-[#5b4636]">
                Konfirmasi Kehadiran
              </Label>
              <RadioGroup
                value={attendance}
                onValueChange={setAttendance}
                className="flex flex-row gap-2"
              >
                {ATTENDANCE_OPTIONS.map((opt) => (
                  <Label
                    key={opt.value}
                    htmlFor={`att-${opt.value}`}
                    className={`flex min-h-9 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full border px-2.5 py-1.5 font-wed text-xs font-medium transition-all has-[[data-state=checked]]:border-[#6d1a24] has-[[data-state=checked]]:bg-[#6d1a24] has-[[data-state=checked]]:text-[#f7f1df] has-[[data-state=checked]]:shadow-md ${
                      attendance === opt.value
                        ? ""
                        : "border-[#d8c9a5] bg-white/70 text-[#5b4636] hover:bg-white"
                    }`}
                  >
                    <RadioGroupItem
                      value={opt.value}
                      id={`att-${opt.value}`}
                      className="sr-only"
                    />
                    {opt.label}
                  </Label>
                ))}
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="rsvp-message"
                className="font-wed text-xs font-semibold text-[#5b4636]"
              >
                Ucapan &amp; Doa
              </Label>
              <Textarea
                id="rsvp-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={1000}
                rows={4}
                placeholder="Tuliskan ucapan dan doa terbaik untuk kedua mempelai..."
                className="resize-none border-[#d8c9a5] bg-white/80 font-wed text-sm text-[#43302a] placeholder:text-[#a8977d] focus-visible:ring-[#6d1a24]/40"
              />
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="min-h-10 w-full gap-2 rounded-full bg-[#6d1a24] font-wed text-sm font-semibold tracking-wide text-[#f7f1df] shadow-lg transition-all hover:bg-[#571420] hover:shadow-xl disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Mengirim...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Kirim Ucapan
                </>
              )}
            </Button>
          </div>
        </motion.form>

        {/* Daftar ucapan */}
        <div className="w-full">
          <div className="wed-divider mb-4">
            <p className="flex items-center gap-2 font-wed text-xs font-semibold uppercase tracking-[0.15em] text-[#6d1a24]">
              <MessageCircleHeart className="h-3.5 w-3.5" aria-hidden="true" />
              Ucapan ({wishes.length})
              {totalHadir > 0 && (
                <span className="rounded-full bg-[#6d1a24] px-2 py-0.5 text-[11px] font-medium tracking-normal text-[#f7f1df]">
                  {totalHadir} hadir
                </span>
              )}
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col gap-3">
              {[0, 1, 2].map((i) => (
                <Skeleton
                  key={i}
                  className="h-24 w-full rounded-xl bg-white/60"
                />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-xl border border-[#d8c9a5] bg-[#faf5e6]/95 p-6 text-center font-wed text-[#5b4636]">
              {error}
            </div>
          ) : wishes.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#c9a227]/70 bg-[#faf5e6]/80 p-6 text-center font-wed italic text-[#5b4636]">
              Belum ada ucapan. Jadilah yang pertama mengirim doa!
            </div>
          ) : (
            <div className="custom-scrollbar max-h-80 overflow-y-auto pr-1.5">
              <ul className="flex flex-col gap-3" aria-label="Daftar ucapan">
                {wishes.map((wish) => (
                  <li
                    key={wish.id}
                    className="rounded-xl border border-[#d8c9a5]/80 bg-[#faf5e6]/95 p-4 shadow-sm backdrop-blur-sm"
                  >
                    <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                      <p className="font-wed text-sm font-bold text-[#6d1a24]">
                        {wish.name}
                      </p>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${ATTENDANCE_BADGE[wish.attendance] ?? "bg-stone-600 text-stone-50"}`}
                      >
                        {ATTENDANCE_LABELS[wish.attendance] ?? wish.attendance}
                      </span>
                    </div>
                    <p className="font-wed text-sm leading-relaxed text-[#43302a]">
                      {wish.message}
                    </p>
                    <p className="mt-1 text-[11px] text-[#a8977d]">
                      {formatTime(wish.createdAt)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
