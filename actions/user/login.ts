"use server";

import { ILoginAction } from "@/interface/login";
import { postLoginRoute } from "@/api/routes/login";
import { redirect } from "next/navigation";
import { encrypt } from "@/utils/encryptDecrypt";
import { cookies } from "next/headers";

export async function loginAction(
  state: ILoginAction,
  formData: FormData
): Promise<ILoginAction> {
  const username = formData.get("username")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  //validation
  if (!username || !password) {
    return {
      message: "Please provide username and password",
      success: false,
      username: "",
    };
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}${postLoginRoute()}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      }
    );

    const data = await res.json();
    if (!data.success) {
      return {
        message: data.message,
        success: data.success,
        username: username,
      };
    }
    //get tokens
    const setCookie = res.headers.get("set-cookie");
    if (setCookie) {
      const cookiesArray = setCookie.split(/,(?=\s*\w+=)/);

      let accessToken = "";
      let refreshToken = "";

      cookiesArray.forEach((cookieStr) => {
        if (cookieStr.includes("access_token_cookie=")) {
          accessToken = cookieStr
            .split(";")[0] // take only key=value part
            .split("=")[1]; // take value
        } else if (cookieStr.includes("refresh_token_cookie=")) {
          refreshToken = cookieStr.split(";")[0].split("=")[1];
        }
      });
      const encryptedAccess = encrypt(accessToken);
      const encryptRefresh = encrypt(refreshToken);
      const cookieStore = await cookies();
      cookieStore.set("u_aid", encryptedAccess, { maxAge: 60 * 10 });
      cookieStore.set("u_rid", encryptRefresh, { maxAge: 24 * 60 * 60 * 7 });
    }
  } catch (err) {
    return {
      message: "Something went wrong",
      success: false,
      username: "",
    };
  }
  redirect("/dashboard");
}
