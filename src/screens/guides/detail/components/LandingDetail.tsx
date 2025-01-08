import { fetchGuide } from "@/services/guides.service";

async function LandingDetail({ detail }: any) {
  const guide = await fetchGuide(detail);

  return (
    <>
    <div className="container">
        <h1 className="text-3xl text-gray-900">{guide?.nameEn}</h1>
    </div>
    </>
  );
}

export default LandingDetail;
