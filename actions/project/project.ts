import { apiClient } from "@/api/apiClient";
import { getProjectsRoute } from "@/api/routes/project";

export async function getProjects() {
  const { success, message, data } = await apiClient(
    getProjectsRoute(),
    {
      method: "GET",
    },
    true
  );
  console.log(success);
  console.log(message);
  console.log(data);
  return { data };
}
