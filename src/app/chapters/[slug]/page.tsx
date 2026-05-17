import { notFound } from "next/navigation";
import { getChapter } from "@/lib/content";
import { ChapterView } from "./chapter-view";

export function generateStaticParams() {
  return [];
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();

  return <ChapterView chapter={chapter} />;
}
