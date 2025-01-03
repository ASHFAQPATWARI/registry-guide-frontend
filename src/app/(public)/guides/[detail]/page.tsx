import GuidesDetail from "@/screens/guides/detail";
import { GuideDetailPageProps } from "@/types";
import React from "react";

async function GuideDetailPage({ params }: GuideDetailPageProps) {
  const resolvedParams = await params;
  const { detail } = resolvedParams;

  return <GuidesDetail detail={detail} />;
}

export default GuideDetailPage;
