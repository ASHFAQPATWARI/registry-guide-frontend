import GuidesDetail from "@/screens/guides/detail";
import React from "react";

async function GuideDetailPage({ params }: any) {
  const props = await params;

  return <GuidesDetail guideUrl={props?.detail} />;
}

export default GuideDetailPage;
