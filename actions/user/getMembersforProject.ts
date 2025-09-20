"use server";
import { apiClient } from "@/api/apiClient";
import { IAPIResponse } from "@/interface/api";
import { getMembersForProjectRoute } from "@/api/routes/users";

export const getMembersForProjectAction = async (): Promise<IAPIResponse> => {
  try {
    const { success, message, data } = await apiClient(
      getMembersForProjectRoute(),
      {},
      true
    );
    return { success, message, data };
  } catch (err: any) {
    return {
      success: false,
      message: "Unexpected error in fetching data",
      data: [],
    };
  }
};
