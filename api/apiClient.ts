import { IAPIRequestOptions, IAPIResponse } from "@/interface/api";
import { cookies } from "next/headers";
import { decrypt } from "@/utils/encryptDecrypt";

export async function apiClient(
  endpoint: string,
  options: IAPIRequestOptions = {},
  tokenReq: boolean
): Promise<IAPIResponse> {
  const { method = "GET", payload, headers } = options;

  try {
    let token: string | undefined = undefined;
    if (tokenReq) {
      const cookieStore = await cookies();

      const u_aid = cookieStore.get("u_aid");
      const u_rid = cookieStore.get("u_rid");

      if (!u_rid) {
        //no refresh token logout
        cookieStore.delete("u_aid");
        cookieStore.delete("u_rid");
        //TODO:re route to login page
      }
      if (!u_aid) {
        //TODO: attemp refresh
      } else {
        token = decrypt(u_aid.value);
      }
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}${endpoint}`,
      {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...headers,
        },
        body: method !== "GET" && payload ? JSON.stringify(payload) : undefined,
      }
    );

    if (res.status == 401) {
      return {
        success: false,
        message: "Not Authorized: Login to access resource",
        data: null,
      };
    }
    let responseData: any;

    try {
      responseData = await res.json();
    } catch {
      responseData = null;
    }

    return {
      success: responseData?.success ?? res.ok,
      message:
        responseData?.message ??
        (res.ok ? "Request successful" : "Request failed"),
      data: responseData?.data ?? null,
    };
  } catch (err) {
    return {
      success: false,
      message: "Something went wrong with our server",
      data: null,
    };
  }
}
