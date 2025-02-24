import Image from "next/image";
import BradCrumbs from "./BradCrumbs";
import AuthorInfo from "./AuthorInfo";

async function HeroSection({ guide, lang }: any) {
  return (
    <>
      <div className="flex md:flex-row flex-col-reverse mx-auto py-11">
        <div className="md:flex md:flex-col">
          <Image
            src={`${process.env.NEXT_PUBLIC_ASSET_URL}${guide.bannerImage}`}
            alt={guide?.name}
            width={768}
            height={512}
            className="aspect-[3/2] md:h-[32rem] lg:h-[28rem]"
          />
        </div>
        <div className="bg-white md:shadow-md h-fit rtl:md:-ms-32 md:-ml-32 ml-0 md:mt-6 mt-0 md:w-80 md:p-7 lg:w-[38rem]">
          <BradCrumbs category={guide?.category} lang={lang} />
          <h1 className="lg:pb-1 pb-3 text-gray-900 text-3xl font-medium m-0">
            {guide?.name}
          </h1>
          <h2 className="text-gray-600 text-sm mb-3 pb-4 lg:block hidden">
            {guide?.description}
          </h2>
          <AuthorInfo
            publishedAt={guide?.publishedAt}
            updatedAt={guide?.updatedAt}
            author={guide.author}
            lang={lang}
          />          
        </div>
      </div>
    </>
  );
}

export default HeroSection;
