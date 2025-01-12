import React from "react";
import Link from "next/link";

export default function BradCrumbs({category}: any) {
  const breadcrumbs = [
    { label: "Guides", href: "#" },
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
