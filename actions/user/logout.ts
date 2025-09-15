"use server";
import { apiClient } from "@/api/apiClient";
import { getLoginRoute } from "@/api/routes/users";
import { cookies } from "next/headers";

export const logoutAction = async () => {
  const { success } = await apiClient(getLoginRoute(), {}, true);
  const cookieStore = await cookies();
  cookieStore.delete("u_aid");
  cookieStore.delete("u_rid");
};
