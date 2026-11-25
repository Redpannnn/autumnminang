export const MEDIA = {
  cover:
    "https://ik.imagekit.io/au8q7zdvt/AUTUMN%20MINANG/COVER%20AUTUMN%20MINANG.mp4",
  welcome:
    "https://ik.imagekit.io/au8q7zdvt/AUTUMN%20MINANG/WELCOME%20AUTUMN%20MINANG.mp4",
  couple:
    "https://ik.imagekit.io/au8q7zdvt/AUTUMN%20MINANG/COUPLE%20AUTUMN%20MINANG.mp4",
  event:
    "https://ik.imagekit.io/au8q7zdvt/AUTUMN%20MINANG/EVENT%20AUTUMN%20MINANG.mp4",
  wallpaper:
    "https://ik.imagekit.io/au8q7zdvt/AUTUMN%20MINANG/WALLPAPER%20AUTUMN%20MINANG.mp4",
  gift:
    "https://ik.imagekit.io/au8q7zdvt/AUTUMN%20MINANG/GIFT%20AUTUMN%20MINANG.mp4",
  closing:
    "https://ik.imagekit.io/au8q7zdvt/AUTUMN%20MINANG/GIFT%20AUTUMN%20MINANG.mp4",
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
