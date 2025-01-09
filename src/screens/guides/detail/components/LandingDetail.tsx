import { fetchGuide } from "@/services/guides.service";
import HeroSection from "./HeroSection";

async function LandingDetail({ detail }: any) {
  const guide = await fetchGuide(detail);

  return (
    <>
      <div className="">
        <HeroSection guide={guide} />
      </div>
    </>
  );
}

export default LandingDetail;
