import { fetchGuide } from "@/services/guides.service";

async function LandingDetail({ guideUrl }: any) {
  const guide = await fetchGuide(guideUrl);

  return (
    <div className="max-w-4xl text-center mx-auto px-4 py-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-900">{guide?.nameEn}</h1>
    </div>
  );
}

export default LandingDetail;
