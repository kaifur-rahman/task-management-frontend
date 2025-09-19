"use server";
import { apiClient } from "@/api/apiClient";
import { redirect } from "next/navigation";
import { postCreateUser } from "@/api/routes/users";
import { revalidatePath } from "next/cache";

export async function addNewUserAction(
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
    lastName: formData.get("lastName") == "" ? null : formData.get("lastName"),
    email: formData.get("email") == "" ? null : formData.get("email"),
    phone: formData.get("phone"),
    role: formData.get("role"),
    subRole: formData.get("subRole") == "" ? null : formData.get("subRole"),
    password: formData.get("password"),
  };
  //validation
  if (
    !newMember.empId ||
    !newMember.firstName ||
    !newMember.phone ||
    !newMember.role ||
    !newMember.password
  ) {
    response.message = "Please enter mandatory fields";
    response.data = newMember;
    return response;
  } else {
    const { success, message, data } = await apiClient(
      postCreateUser(),
      { method: "POST", payload: newMember },
      true
    );
    if (!success) {
      response.message = message;
      response.data = newMember;
      return response;
    } else {
      response.success = true;
      response.message = message;
      response.data = {};
      //show in snackbar
      revalidatePath("/team");
      redirect("/team");
    }
  }
}
