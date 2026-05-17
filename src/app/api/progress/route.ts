import { NextResponse } from "next/server";
import { z } from "zod";

const progressSchema = z.object({
  questionId: z.string(),
  confidence: z.number().min(0).max(100),
  completed: z.boolean(),
  note: z.string().optional(),
});

export async function POST(request: Request) {
  const parsed = progressSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid progress payload" }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    saved: parsed.data,
    persistence: "local-first; connect DATABASE_URL and Prisma user auth for server persistence",
  });
}
