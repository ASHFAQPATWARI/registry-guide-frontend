import { fetchGuide } from "@/services/guides.service";
import { GuideDetailPageParams } from "@/types";

async function LandingDetail({ detail }: GuideDetailPageParams) {
  const guide = await fetchGuide(detail);

  return (
    <div className="max-w-4xl text-center mx-auto px-4 py-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-900">{guide?.nameEn}</h1>
    </div>
  );
}

export default LandingDetail;
