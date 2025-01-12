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
          className="rounded-2xl w-6 h-6 align-middle"
        />
        <div className="px-2">
          <div>
            <div>
              <div>
                <h6 className="m-0 text-gray-600 text-xs">
                  By{" "}
                  <span className="text-primary-500 pb-1 text-xs font-medium">
                    <Link href="#">{author?.name}</Link>
                  </span>
                </h6>
                <h6></h6>
                <div className="md:hidden text-xs text-gray-600">
                  <span>Published {formatDate(publishedAt)}</span>
                  <span className="px-1 text-gray-400">|</span>
                  <span>Updated On {formatDate(updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex flex-col lg:ml-2 ml-8 text-xs text-gray-600 hidden">
        <span className="lg:text-right">
          Published {formatDate(publishedAt)}
        </span>
        <span>Updated On {formatDate(updatedAt)}</span>
      </div>
    </div>
  );
}
