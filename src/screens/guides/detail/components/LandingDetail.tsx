import { fetchGuide } from "@/services/guides.service";
import HeroSection from "./HeroSection";
import GuideRenderHtml from "./GuideRenderHtml";

async function LandingDetail({ detail }: any) {
  const guide = await fetchGuide(detail);

  return (
    <>
      <div className="">
        <HeroSection guide={guide} />
        <GuideRenderHtml content={guide?.content} />
      </div>
    </>
  );
}

export default LandingDetail;
