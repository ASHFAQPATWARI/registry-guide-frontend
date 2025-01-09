import Image from "next/image";
import Link from "next/link"; //change path

async function HeroSection({ guide }: any) {
  return (
    <>
        <div className="flex md:flex-row flex-col mx-auto py-11">
            <div className="md:flex md:flex-col hidden">
                {/* image */}
                <Image
                    src={`${process.env.NEXT_PUBLIC_ASSET_URL}${guide.bannerImage}`}
                    alt={guide?.nameEn}
                    width={768}
                    height={512}
                    className="aspect-[3/2] md:h-[32rem] lg:h-[28rem]"
                />
            </div>
            {/* box  */}
            <div className="bg-white md:shadow-md h-fit md:ml-[-120px] ml-0 md:mt-6 mt-0 md:w-[20rem] md:p-7 lg:w-[38rem]">
                <div className="hidden lg:block">
                    <ul className="pl-0 list-none mt-0 mb-3 flex">
                        {/* change link path */}
                        <li className="inline-block">
                            <Link className="px-1 text-xs text-[#b2aeb0]" href='#'>Guides</Link>
                            <span className="px-3 text-xs text-[#b2aeb0]">{'>'}</span>
                        </li>
                        <li className="inline-block">
                            <Link className="px-1 text-xs text-[#b2aeb0]" href='#'>Grandparenting</Link>
                            <span className="px-3 text-xs text-[#b2aeb0]">{'>'}</span>
                        </li>
                        <li className="inline-block">
                            <Link className="px-1 text-xs text-[#6b6669]" href='#'>Holiday</Link>
                        </li>
                    </ul>
                </div>
                <h1 className="lg:pb-1 pb-3 pt-3 text-[#252324] text-3xl font-medium m-0">25 Family Holiday Traditions You Can Start Right Now</h1>
                <h2 className="text-[#6b6669] text-sm mb-3 pb-4 lg:block hidden">A new baby means new holiday traditions for your family.</h2>
                <div className="flex lg:flex-row flex-col pb-4 lg:justify-between">
                    {/* channge image path */}
                    <div className="flex flex-row">
                        <Image src={`${process.env.NEXT_PUBLIC_ASSET_URL}${guide.bannerImage}`} height={24} width={24} alt="profile" className="rounded-[50%] w-6 h-6 align-middle"/>
                        <div className="px-2">
                            <div>
                                <div>
                                    <div>
                                        {/* change link path */}
                                        <h6 className="m-0 text-[#6b6669] text-xs">By <span className="text-[#904183] pb-1 text-xs font-medium"><Link href='#'>Amylia Ryan</Link></span></h6>
                                        <h6></h6>
                                        <div className="md:hidden text-xs text-[#6b6669]">
                                            <span>Published Dec 2, 2024</span>
                                            <span className="px-1 text-[#b2aeb0]">|</span>
                                            <span>Updated On Dec 9, 2024</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex flex-col lg:ml-2 ml-8 text-[10px] text-[#6b6669] hidden">
                        <span className="lg:text-right">Published Dec 2, 2024</span>
                        <span>Updated On Dec 9, 2024</span>
                    </div>
                </div>
                <div className="flex mb-5 justify-start bg-[#fafafa] rounded-xl">
                    <span className="text-[#6b6669] text-[8px] py-2 px-4 m-0">Our editors independently test and curate products. If you make a purchase via our links we may earn a commission.</span>
                </div>
            </div>
            <div className="md:hidden">
                {/* image */}
                <Image
                    src={`${process.env.NEXT_PUBLIC_ASSET_URL}${guide.bannerImage}`}
                    alt={guide?.nameEn}
                    width={768}
                    height={512}
                    className="aspect-[3/2] h-96"
                />
            </div>
        </div>
    </>
  );
}

export default HeroSection;
