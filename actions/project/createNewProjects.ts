"use server";
import { apiClient } from "@/api/apiClient";
import { IAPIResponse } from "@/interface/api";
import { getUserEmpId, getUserRole } from "@/utils/extractDetailsFromToken";
import { postCreateNewProjectRoute } from "@/api/routes/projects";
import { revalidatePath } from "next/cache";

export async function createNewProjectAction(
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
  const membersValue = formData.get("projectMembers");
  const members =
    typeof membersValue === "string"
      ? membersValue.split(",").map((m) => m.trim())
      : null;
  //extract values
  const newProject = {
    name: formData.get("projectName"),
    description: formData.get("projectDescription"),
    lead: leadId, //get from cookie decode
    members: members,
    priority: formData.get("projectPriority"),
    category: formData.get("projectCategory"),
  };
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
      return response;
    }
  }
}
