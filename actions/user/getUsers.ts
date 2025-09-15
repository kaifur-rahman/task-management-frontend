"use server";
import { apiClient } from "@/api/apiClient";
import { getUsers } from "@/api/routes/users";

export const getUsersData = async () => {
  const { success, message, data } = await apiClient(getUsers(), {}, true);
  console.log(success);
  console.log(message);
  console.log(data);
  return { success: success, message: message, data: data };
};
