import { GuideDetailPageParams } from "@/types";
import LandingDetail from "./components/LandingDetail";

function GuidesDetail({ detail }: GuideDetailPageParams) {
  return (
    <div>
      <LandingDetail detail={detail} />
    </div>
  );
}

export default GuidesDetail;
