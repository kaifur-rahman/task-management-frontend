import { apiClient } from "@/api/apiClient";
import { getAllProjectsRoute } from "@/api/routes/projects";

export async function getAllProjectsAction() {
  const { success, message, data } = await apiClient(
    getAllProjectsRoute(),
    {
      method: "GET",
    },
    true
  );
  return { success, message, data };
}
