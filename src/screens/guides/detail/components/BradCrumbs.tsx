import React from "react";
import Link from "next/link";
import translation from "@/locales/translation";

export default function BradCrumbs({ category, lang }: any) {
  const heroSection = translation?.heroSection;
  const breadcrumbs = [
    {
      label: lang == 'en' ? heroSection.guidesEn : heroSection.guidesAr,
      href: "#",
    },
    { label: category?.parent?.name, href: "#" },
    { label: category?.name, href: "#" },
  ];
  return (
    <div className="hidden lg:block">
      <ul className="pl-0 list-none mt-0 mb-3 flex">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="inline-block">
            <Link
              className={`$px-1 text-xs ${
                index !== breadcrumbs.length - 1
                  ? "text-gray-400"
                  : "text-gray-600"
              }`}
              href={breadcrumb?.href}
            >
              {breadcrumb?.label}
            </Link>
            <span className="px-3 text-xs text-gray-400">{">"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
