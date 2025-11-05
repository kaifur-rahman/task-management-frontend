"use server";
import { apiClient } from "@/api/apiClient";
import { revalidatePath } from "next/cache";
import { putUpdateProjectRoute } from "@/api/routes/projects";

export async function updateArchivedAction(
  projectId: string,
  currentlyArchived: boolean
) {
  //TODO: Show success or fail on snackbar
  if (projectId) {
    const { success, message, data } = await apiClient(
      putUpdateProjectRoute(projectId),
      {
        method: "PUT",
        payload: { archived: !currentlyArchived },
      },
      true
    );
    revalidatePath("/projects");
    return { success: success, message: message, data: data };
  } else {
    //show error
    return { success: false, message: "Project Id not found", data: [] };
  }
}
