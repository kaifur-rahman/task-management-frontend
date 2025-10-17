import { cookies } from "next/headers";
import { postRefreshTokenRoute } from "./routes/users";
import { IAPIRequestOptions, IAPIResponse } from "@/interface/api";

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
    const cookieStore = await cookies();
    if (tokenReq) {
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

    if (res.status == 401 && !refresh && tokenReq) {
      const refreshResponse = await apiClient(
        postRefreshTokenRoute(),
        { method: "POST" },
        true,
        true
      );
      if (refreshResponse.success && refreshResponse.data) {
        cookieStore.set("u_aid", refreshResponse.data);
        //now re-try
        return await apiClient(endpoint, options, tokenReq);
      } else {
        //refresh also failed
        cookieStore.delete("u_aid");
        cookieStore.delete("u_rid");
        return {
          success: false,
          message: "Session expired. Ploease login again",
          data: null,
        };
      }
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
