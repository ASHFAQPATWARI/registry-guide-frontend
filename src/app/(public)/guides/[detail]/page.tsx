import GuidesDetail from "@/screens/guides/detail";
import React from "react";

async function GuideDetailPage({ params }: any) {
  const resolvedParams = await params;
  const { detail } = resolvedParams;

  return <GuidesDetail detail={detail} />;
}

export default GuideDetailPage;
