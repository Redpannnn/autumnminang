import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const VALID_ATTENDANCE = ["HADIR", "TIDAK_HADIR", "RAGU"] as const;

export async function GET() {
  try {
    const wishes = await db.wish.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    return NextResponse.json({ wishes });
  } catch (error) {
    console.error("GET /api/wishes error:", error);
    // Fallback daftar kosong supaya undangan tetap tampil normal
    // walau database belum siap / tidak tersedia (mis. di hosting)
    return NextResponse.json({ wishes: [] });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const attendance =
      typeof body?.attendance === "string" ? body.attendance : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!name || !message) {
      return NextResponse.json(
        { error: "Nama dan ucapan wajib diisi." },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        { error: "Nama maksimal 100 karakter." },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: "Ucapan maksimal 1000 karakter." },
        { status: 400 }
      );
    }

    if (!VALID_ATTENDANCE.includes(attendance as (typeof VALID_ATTENDANCE)[number])) {
      return NextResponse.json(
        { error: "Status kehadiran tidak valid." },
        { status: 400 }
      );
    }

    const wish = await db.wish.create({
      data: { name, attendance, message },
    });

    return NextResponse.json({ wish }, { status: 201 });
  } catch (error) {
    console.error("POST /api/wishes error:", error);
    return NextResponse.json(
      { error: "Gagal mengirim ucapan. Coba lagi ya." },
      { status: 500 }
    );
  }
}
