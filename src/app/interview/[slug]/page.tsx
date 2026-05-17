import { notFound } from "next/navigation";
import { AiInterviewer } from "@/components/interview/ai-interviewer";
import { getChapter } from "@/lib/content";

export default async function InterviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();
  return <AiInterviewer chapter={chapter} />;
}
