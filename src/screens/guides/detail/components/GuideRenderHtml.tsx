import { getGuideHtml } from "@/utils/helper";
import React from "react";

export default async function GuideRenderHtml({ content }: any) {
  const html = await getGuideHtml(content);
  return (
    <div
      className="sm:w-1/2 mx-auto"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
