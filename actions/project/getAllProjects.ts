"use server";
import { apiClient } from "@/api/apiClient";
import { IAPIResponse } from "@/interface/api";
import { getAllProjectsRoute } from "@/api/routes/projects";

export async function getAllProjectsAction(): Promise<IAPIResponse> {
  try {
    const { success, message, data } = await apiClient(
      getAllProjectsRoute(),
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
