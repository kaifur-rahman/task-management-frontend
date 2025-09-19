"use server";
import { cookies } from "next/headers";

const decodeJWTPayload = async () => {
  const cookieStore = await cookies();
  const uAid = cookieStore.get("u_aid");
  let payload = undefined;

  if (uAid?.value) {
    const parts = uAid.value.split(".");
    if (parts.length === 3 && parts[1]) {
      const base64Url = parts[1]; // payload part
      if (base64Url) {
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        payload = JSON.parse(jsonPayload);
      }
    }
  }
  return payload;
};
export const getUserEmpId = async (): Promise<string | undefined> => {
  const payload = await decodeJWTPayload();
  return payload?.username;
};
export const getUserName = async (): Promise<string | undefined> => {
  const payload = await decodeJWTPayload();
  return payload?.username;
};
export const getUserFirstName = async (): Promise<string | undefined> => {
  const payload = await decodeJWTPayload();
  return payload?.first_name;
};
export const getUserLastName = async (): Promise<string | undefined> => {
  const payload = await decodeJWTPayload();
  return payload?.last_name;
};
export const getUserRole = async (): Promise<string | undefined> => {
  const payload = await decodeJWTPayload();
  return payload?.role;
};
export const getUserSubRole = async (): Promise<string | undefined> => {
  const payload = await decodeJWTPayload();
  return payload?.sub_role;
};
