import { notFound } from "next/navigation";
import { getBtpSection } from "@/lib/btp-content";
import { BtpSectionView } from "./section-view";

export function generateStaticParams() {
  return [];
}

export default async function BtpSectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const section = getBtpSection(slug);
  if (!section) notFound();

  return <BtpSectionView section={section} />;
}
