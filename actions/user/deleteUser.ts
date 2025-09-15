"use server";
import { apiClient } from "@/api/apiClient";
import { deleteUserRoute } from "@/api/routes/users";
import { revalidatePath } from "next/cache";

export const deleteUserAction = async (empId: string) => {
  const { success, message, data } = await apiClient(
    deleteUserRoute(empId),
    { method: "DELETE" },
    true
  );
  if (success) {
    revalidatePath("/team");
    return { success, message, data };
  } else {
    return { success, message, data };
  }
};
