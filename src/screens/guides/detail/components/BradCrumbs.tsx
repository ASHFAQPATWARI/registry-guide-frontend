import React from "react";
import Link from "next/link";

export default function BradCrumbs({category}: any) {
  const breadcrumbs = [
    { label: "Guides", href: "#" },
    { label: category?.parent?.nameEn, href: "#" },
    { label: category?.nameEn, href: "#" },
  ];
  return (
    <div className="hidden lg:block">
      <ul className="pl-0 list-none mt-0 mb-3 flex">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="inline-block">
            <Link
              className={`$px-1 text-xs ${
                index !== breadcrumbs.length - 1
                  ? "text-[#b2aeb0]"
                  : "text-[#6b6669]"
              }`}
              href={breadcrumb?.href}
            >
              {breadcrumb?.label}
            </Link>
            <span className="px-3 text-xs text-[#b2aeb0]">{">"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
