import { IStorePageProps } from "@/types";
import { getField } from "@/utils/helper";
import Image from "next/image";

function BannerSection({ store, lang, imagePrefix }: IStorePageProps) {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="h-2 w-full bg-teal-500 rounded-t-2xl mb-0" />
            <div className="bg-white rounded-b-2xl shadow-lg flex flex-col sm:flex-row items-center px-8 py-8 gap-8">
                <div className="flex-shrink-0">
                    <Image
                        src={`${imagePrefix}${store.storeLogo}`}
                        alt={getField(store.nameEn, store.nameAr, lang)}
                        width={100}
                        height={100}
                        className="w-24 h-24 object-cover rounded-xl border-2 border-gray-200 bg-gray-100 shadow"
                    />
                </div>
                <div className="text-center sm:text-left">
                    <h1 className="text-3xl font-bold mb-2 text-teal-700">
                        {getField(store.nameEn, store.nameAr, lang)}
                    </h1>
                    <p className="text-gray-600 text-base max-w-xl">
                        {getField(store.descriptionEn, store.descriptionAr, lang)}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default BannerSection;