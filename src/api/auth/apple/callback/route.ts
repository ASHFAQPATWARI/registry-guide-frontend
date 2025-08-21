import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const formData = await req.formData();
  const appleResponse = Object.fromEntries(formData.entries());

  const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/users/auth/apple`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idToken: appleResponse.id_token,
      deviceName: "Iphone",
      devicePlatform: "App",
      osVersion: "v1.2.3",
    }),
  });

  const backendData = await backendRes.json();

  const res = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth/apple/success`);

  if (backendData.accessToken && backendData.refreshToken) {
    res.cookies.set("access-token", backendData.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    res.cookies.set("refresh-token", backendData.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  return res;
}
