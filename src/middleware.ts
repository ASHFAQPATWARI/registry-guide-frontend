import { NextRequest, NextResponse } from "next/server";

const locales = ["ar"];

const createResponse = (url: URL, request: NextRequest, language: string) => {
  const response = NextResponse.rewrite(url);
  response.headers.set("Accept-Language", language);
  response.headers.set("x-url", request.url);
  return response;
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/en/")) {
    return createResponse(
      new URL(pathname.replace(/^\/en/, ""), request.url),
      request,
      "en"
    );
  }

  const pathnameHasLocale = locales.some((locale) =>
    pathname.startsWith(`/${locale}/`)
  );

  if (!pathnameHasLocale) {
    return createResponse(new URL(`/en${pathname}`, request.url), request, "en");
  }

  const matchedLocale = pathname.split("/")[1];
  return createResponse(request.nextUrl, request, locales.includes(matchedLocale) ? matchedLocale : "en");
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico|manifest.json|robots.txt).*)"],
};
