import { notFound } from "next/navigation";
import { BtpAiInterviewer } from "@/components/btp/ai-interviewer";
import { getBtpSection } from "@/lib/btp-content";

export default async function BtpInterviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const section = getBtpSection(slug);
  if (!section) notFound();
  return <BtpAiInterviewer section={section} />;
}
