"use server";
import { apiClient } from "@/api/apiClient";
import { IAPIResponse } from "@/interface/api";
import { getMyProjectsRoute } from "@/api/routes/projects";

export async function getMyProjectsAction(): Promise<IAPIResponse> {
  try {
    const { success, message, data } = await apiClient(
      getMyProjectsRoute(),
      {
        method: "GET",
      },
      true
    );
    return { success, message, data };
  } catch (err: any) {
    return {
      success: false,
      message: err.message ?? "Unexpected error in performing this action.",
      data: [],
    };
  }
}
