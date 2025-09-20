"use server";
import { apiClient } from "@/api/apiClient";
import { revalidatePath } from "next/cache";
import { putUpdateProjectRoute } from "@/api/routes/projects";

export async function updateArchivedAction(formData: FormData) {
  //TODO: Show success or fail on snackbar
  const projectId = formData.get("projectId")?.toString();
  const currentlyArchived = formData.get("archived") == "true" ? true : false;
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
  } else {
    //show error
  }
}
