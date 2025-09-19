import { apiClient } from "@/api/apiClient";
import { getArchivedProjectsRoute } from "@/api/routes/projects";

export async function getArchivedProjectsAction() {
  const { success, message, data } = await apiClient(
    getArchivedProjectsRoute(),
    {
      method: "GET",
    },
    true
  );
  console.log(success);
  console.log(message);
  return { success, message, data };
}
