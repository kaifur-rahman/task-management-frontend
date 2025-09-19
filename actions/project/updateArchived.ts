"use server";
import { apiClient } from "@/api/apiClient";
import { revalidatePath } from "next/cache";
import { putUpdateProjectRoute } from "@/api/routes/projects";

export async function updateArchivedAction(formData: FormData) {
  const projectId = formData.get("projectId")?.toString();
  const currentlyArchived = formData.get("archived") == "true" ? true : false;
  console.log(projectId);
  console.log(currentlyArchived);
  if (projectId) {
    console.log("inside if");
    const { success, message, data } = await apiClient(
      putUpdateProjectRoute(projectId),
      {
        method: "PUT",
        payload: { archived: !currentlyArchived },
      },
      true
    );
    console.log(message);
    revalidatePath("/projects");
  } else {
    //show error
  }
}
