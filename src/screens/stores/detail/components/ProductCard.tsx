import { IStorePageProps } from "@/types";
import { getField } from "@/utils/helper";
import Image from "next/image";

function ProductCard({ store, lang, imagePrefix }: IStorePageProps) {
    return (
        <div className="max-w-4xl mx-auto mt-12">
            <h2 className="text-2xl font-bold mb-6 text-teal-700 px-2">{lang === "ar" ? "المنتجات" : "Products"}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-2 pb-10">
                {store.products?.map((product: any) => (
                    <div key={product.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow hover:shadow-lg transition flex flex-col items-center">
                        <Image
                            src={`${imagePrefix}${product.images?.[0]?.path}`}
                            alt={getField(product.nameEn, product.nameAr, lang)}
                            width={320}
                            height={160}
                            className="w-full h-40 object-cover rounded-lg mb-4 border border-gray-100"
                        />
                        <h3 className="text-lg font-bold mb-2 text-teal-800 text-center">{getField(product.nameEn, product.nameAr, lang)}</h3>
                        <p className="text-teal-700 font-semibold text-base mb-1">{product.price} {product.currencyCode}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductCard;