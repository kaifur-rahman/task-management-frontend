"use server";
import { apiClient } from "@/api/apiClient";
import { IAPIResponse } from "@/interface/api";
import { getUserEmpId, getUserRole } from "@/utils/extractDetailsFromToken";
import { putUpdateProjectRoute } from "@/api/routes/projects";
import { revalidatePath } from "next/cache";

export async function updateProjectAction(
  _state: IAPIResponse,
  formData: FormData
): Promise<IAPIResponse> {
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

  // Safely convert members to string before splitting
  const projectId = formData.get("projectId")?.toString();
  if (!projectId) {
    response.message = "Project ID not found";
    return response;
  }
  const membersValue = formData.get("projectMembers");
  const members =
    typeof membersValue === "string"
      ? membersValue.split(",").map((m) => m.trim())
      : null;
  //extract values
  const updatedProject = {
    name: formData.get("projectName"),
    description: formData.get("projectDescription"),
    lead: leadId,
    members: members,
    priority: formData.get("projectPriority"),
    category: formData.get("projectCategory"),
  };
  //validation
  if (
    !updatedProject.name ||
    !updatedProject.lead ||
    !updatedProject.members ||
    !updatedProject.priority ||
    !updatedProject.category
  ) {
    response.message = "Please enter mandatory fields";
    response.data = updatedProject;
    return response;
  } else {
    const { success, message, data } = await apiClient(
      putUpdateProjectRoute(projectId),
      { method: "PUT", payload: updatedProject },
      true
    );
    if (!success) {
      response.message = message;
      response.data = updatedProject;
      return response;
    } else {
      response.success = true;
      response.message = message;
      response.data = {};
      revalidatePath("/projects");
      return response;
    }
  }
}
