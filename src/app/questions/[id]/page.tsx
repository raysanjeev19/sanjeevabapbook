import { notFound } from "next/navigation";
import { QuestionReader } from "@/components/book/question-reader";
import { getQuestion } from "@/lib/content";

export default async function QuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const question = getQuestion(id);
  if (!question) notFound();
  return <QuestionReader question={question} />;
}
