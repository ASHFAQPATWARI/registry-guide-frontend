import { fetchStore } from "@/services/guides.service";
import { headers } from "next/headers";
import BannerSection from "./components/BannerSection";
import ProductCard from "./components/ProductCard";

async function StoreDetail({ detail }: any) {
  const store = await fetchStore(detail);
  const headerList = await headers();
  const lang = headerList.get("Accept-Language")?.startsWith("ar") ? "ar" : "en";
  const imagePrefix = process.env.NEXT_PUBLIC_ASSET_URL;
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Banner Section */}
      <BannerSection store={store} lang={lang} imagePrefix={imagePrefix} />

      {/* Products Section */}
      <ProductCard store={store} lang={lang} imagePrefix={imagePrefix} />
    </div>
  );
}

export default StoreDetail;
