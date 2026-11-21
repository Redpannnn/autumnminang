export const MEDIA = {
  cover:
    "https://imglinkv-3.vercel.app/api/images/cmwqxrmf36kk8oire/file",
  welcome:
    "https://imglinkv-3.vercel.app/api/images/cmwqxr0xiakkufigj/file",
  couple:
    "https://imglinkv-3.vercel.app/api/images/cmwqxr4pfh1whtoqi/file",
  event:
    "https://imglinkv-3.vercel.app/api/images/cmwqxr88z4xh2tzif/file",
  wallpaper:
    "https://imglinkv-3.vercel.app/api/images/cmwqxrfn2qwzg8ain/file",
  gift:
    "https://imglinkv-3.vercel.app/api/images/cmwqxrbyglyfqwgps/file",
  closing:
    "https://imglinkv-3.vercel.app/api/images/cmwqxrj10zgkm6dh8/file",
} as const;

export const GALLERY_IMAGES = [
  "https://lukiskenangan.com/themes/_assets/demo/preview18/1.jpg",
  "https://lukiskenangan.com/themes/_assets/demo/preview18/5.jpg",
  "https://lukiskenangan.com/themes/_assets/demo/preview18/6.jpg",
  "https://lukiskenangan.com/themes/_assets/demo/preview18/7.jpg",
  "https://lukiskenangan.com/themes/_assets/demo/preview18/8.jpg",
] as const;

export const ATTENDANCE_LABELS: Record<string, string> = {
  HADIR: "Hadir",
  TIDAK_HADIR: "Tidak Hadir",
  RAGU: "Masih Ragu",
};

export type WishItem = {
  id: string;
  name: string;
  attendance: string;
  message: string;
  createdAt: string;
};
