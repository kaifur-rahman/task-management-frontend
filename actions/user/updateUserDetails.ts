"use server";
import { apiClient } from "@/api/apiClient";
import { putUpdateUserRoute } from "@/api/routes/users";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateUserDetailsAction(
  _state: string,
  formData: FormData
): Promise<any> {
  const response = {
    success: false,
    message: "",
    data: {},
  };
  //extract values
  const newMember = {
    empId: formData.get("empId"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email") == "" ? null : formData.get("email"),
    phone: formData.get("phone"),
    role: formData.get("role"),
    subRole: formData.get("subRole") == "" ? null : formData.get("subRole"),
    password: formData.get("password") == "" ? null : formData.get("password"),
  };
  //validation
  if (!newMember.empId) {
    response.message = "Emp ID is missing";
    response.data = newMember;
    return response;
  } else {
    const { success, message, data } = await apiClient(
      putUpdateUserRoute(newMember.empId),
      { method: "PUT", payload: newMember },
      true
    );
    if (!success) {
      response.message = message;
      response.data = newMember;
      return response;
    } else {
      response.success = true;
      response.message = message;
      response.data = newMember;
      //show in snackbar
      revalidatePath("/team");
      redirect("/team");
    }
  }
}
