"use server";
import { apiClient } from "@/api/apiClient";
import { revalidatePath } from "next/cache";
import { deleteProjectRoute } from "@/api/routes/projects";

export async function deleteProjectAction(projectId: string) {
  //TODO: Show success or fail on snackbar
  if (projectId) {
    const { success, message, data } = await apiClient(
      deleteProjectRoute(projectId),
      {
        method: "DELETE",
        payload: {},
      },
      true
    );
    revalidatePath("/projects");
    return { success: success, message: message, data: data };
  } else {
    return { success: false, message: "Project ID not found", data: [] };
  }
}
