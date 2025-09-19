"use server";
import { apiClient } from "@/api/apiClient";
import { getUserEmpId } from "@/utils/extractDetailsFromToken";
import { getMyProjectsRoute } from "@/api/routes/projects";

export async function getMyProjectsAction() {
  const { success, message, data } = await apiClient(
    getMyProjectsRoute(),
    {
      method: "GET",
    },
    true
  );
  console.log(message);
  return { success, message, data };
}
