import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { apiClient } from "./api/apiClient";
import {
  postValidateTokenRoute,
  postRefreshTokenRoute,
} from "./api/routes/users";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const { pathname } = request.nextUrl;
  const uRid = request.cookies.get("u_rid")?.value;

  if (!uRid) {
    request.cookies.clear();
    cookieStore.delete("u_aid");
    if (pathname.startsWith("/login")) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    //validate access token
    const { success } = await apiClient(
      postValidateTokenRoute(),
      { method: "POST" },
      true
    );
    if (!success) {
      //access token expired or not valid
      const { success, data } = await apiClient(
        postRefreshTokenRoute(),
        { method: "POST" },
        true,
        true
      );
      if (!success) {
        //refresh token also not valid or expired
        request.cookies.clear();
        cookieStore.delete("u_aid");
        cookieStore.delete("u_rid");
        return NextResponse.redirect(new URL("/login", request.url));
      } else {
        cookieStore.set("u_aid", data);
        if (pathname.startsWith("/login")) {
          return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.next();
      }
    } else {
      if (pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: ["/login", "/", "/team", "/projects"],
};
