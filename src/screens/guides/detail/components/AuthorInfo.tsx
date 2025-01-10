import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/utils/helper";

export default function AuthorInfo({ publishedAt, updatedAt, author }: any) {
  return (
    <div className="flex lg:flex-row flex-col pb-4 lg:justify-between">
      <div className="flex flex-row">
        <Image
          src={`${process.env.NEXT_PUBLIC_ASSET_URL}${author?.image}`}
          height={24}
          width={24}
          alt="profile"
          className="rounded-[50%] w-6 h-6 align-middle"
        />
        <div className="px-2">
          <div>
            <div>
              <div>
                <h6 className="m-0 text-[#6b6669] text-xs">
                  By{" "}
                  <span className="text-[#904183] pb-1 text-xs font-medium">
                    <Link href="#">{author?.nameEn}</Link>
                  </span>
                </h6>
                <h6></h6>
                <div className="md:hidden text-xs text-[#6b6669]">
                  <span>Published {formatDate(publishedAt)}</span>
                  <span className="px-1 text-[#b2aeb0]">|</span>
                  <span>Updated On {formatDate(updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex flex-col lg:ml-2 ml-8 text-[10px] text-[#6b6669] hidden">
        <span className="lg:text-right">
          Published {formatDate(publishedAt)}
        </span>
        <span>Updated On {formatDate(updatedAt)}</span>
      </div>
    </div>
  );
}
