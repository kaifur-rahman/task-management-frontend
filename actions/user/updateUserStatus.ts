"use server";
import { apiClient } from "@/api/apiClient";
import { putUpdateUserRoute } from "@/api/routes/users";
import { revalidatePath } from "next/cache";

export const updateUserStatusAction = async (
  empId: string,
  newStatus: string
) => {
  const { success, message, data } = await apiClient(
    putUpdateUserRoute(empId),
    { method: "PUT", payload: { status: newStatus } },
    true
  );
  if (success) {
    revalidatePath("/team");
    return { success, message, data };
  } else {
    return { success, message, data };
  }
};
