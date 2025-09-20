"use server";
import { apiClient } from "@/api/apiClient";
import { IAPIResponse } from "@/interface/api";
import { getArchivedProjectsRoute } from "@/api/routes/projects";

export async function getArchivedProjectsAction(): Promise<IAPIResponse> {
  try {
    const { success, message, data } = await apiClient(
      getArchivedProjectsRoute(),
      {
        method: "GET",
      },
      true
    );
    return { success, message, data };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message ?? "Unexpected error in performing this action.",
      data: [],
    };
  }
}
