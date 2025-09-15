import { IAPIRequestOptions, IAPIResponse } from "@/interface/api";
import { cookies } from "next/headers";

export async function apiClient(
  endpoint: string,
  options: IAPIRequestOptions = {},
  tokenReq: boolean,
  refresh: boolean = false
): Promise<IAPIResponse> {
  const { method = "GET", payload, headers } = options;

  try {
    let u_aid: string | undefined = undefined;
    let u_rid: string | undefined = undefined;
    if (tokenReq) {
      const cookieStore = await cookies();
      u_aid = cookieStore.get("u_aid")?.value;
      u_rid = cookieStore.get("u_rid")?.value;
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}${endpoint}`,
      {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...{ Authorization: `Bearer ${refresh ? u_rid : u_aid}` },
          ...headers,
        },
        body: method !== "GET" && payload ? JSON.stringify(payload) : undefined,
      }
    );

    if (res.status == 401) {
      return {
        success: false,
        message: "Not Authorized",
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
        (res.ok
          ? "Request was successful but no message received"
          : "Request failed"),
      data: responseData?.data ?? null,
    };
  } catch (err) {
    return {
      success: false,
      message: "Something went wrong: " + err,
      data: null,
    };
  }
}
