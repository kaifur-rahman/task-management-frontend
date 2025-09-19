"use server";
import { apiClient } from "@/api/apiClient";
import { getMembersForProjectRoute } from "@/api/routes/users";

export const getMembersForProjectAction = async () => {
  const { success, message, data } = await apiClient(
    getMembersForProjectRoute(),
    {},
    true
  );
  return { success, message, data };
};
