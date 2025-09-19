"use server";
import { apiClient } from "@/api/apiClient";
import { getUserEmpId, getUserRole } from "@/utils/extractDetailsFromToken";
import { postCreateNewProjectRoute } from "@/api/routes/projects";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createNewProjectAction(
  _state: string,
  formData: FormData
): Promise<any> {
  const response = {
    success: false,
    message: "",
    data: {},
  };

  const leadId = await getUserEmpId();
  const requesterRole = await getUserRole();

  if (!leadId && requesterRole != "Lead" && requesterRole != "Admin") {
    response.message = "Not allowed";
    return response;
  }
  //extract values
  const newProject = {
    name: formData.get("projectName"),
    description: formData.get("projectDescription"),
    lead: leadId, //get from cookie decode
    members: formData.get("projectMembers")?.split(",") ?? null,
    priority: formData.get("projectPriority"),
    category: formData.get("projectCategory"),
  };
  console.log(newProject);
  //validation
  if (
    !newProject.name ||
    !newProject.lead ||
    !newProject.members ||
    !newProject.priority ||
    !newProject.category
  ) {
    response.message = "Please enter mandatory fields";
    response.data = newProject;
    return response;
  } else {
    const { success, message, data } = await apiClient(
      postCreateNewProjectRoute(),
      { method: "POST", payload: newProject },
      true
    );
    if (!success) {
      response.message = message;
      response.data = newProject;
      return response;
    } else {
      response.success = true;
      response.message = message;
      response.data = {};
      revalidatePath("/projects");
      redirect("/projects");
    }
  }
}
