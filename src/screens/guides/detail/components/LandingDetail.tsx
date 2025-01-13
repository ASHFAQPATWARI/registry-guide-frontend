import { fetchGuide } from "@/services/guides.service";
import HeroSection from "./HeroSection";
import GuideRenderHtml from "./GuideRenderHtml";
import { headers } from "next/headers";

async function LandingDetail({ detail }: any) {
  const guide = await fetchGuide(detail);
  const headerList = await headers();
  const lang = headerList.get("Accept-Language");
  return (
    <>
      <div className="">
        <HeroSection guide={guide} lang={lang} />
        <GuideRenderHtml content={guide?.content} />
      </div>
    </>
  );
}

export default LandingDetail;
