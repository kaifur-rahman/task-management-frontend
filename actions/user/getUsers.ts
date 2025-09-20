"use server";
import { apiClient } from "@/api/apiClient";
import { IAPIResponse } from "@/interface/api";
import { getUsersRoute } from "@/api/routes/users";

export const getUsersDataAction = async (): Promise<IAPIResponse> => {
  try {
    const { success, message, data } = await apiClient(
      getUsersRoute(),
      {},
      true
    );
    return { success: success, message: message, data: data };
  } catch (err: any) {
    return {
      success: false,
      message: "Unexpected error in performing this action",
      data: [],
    };
  }
};
