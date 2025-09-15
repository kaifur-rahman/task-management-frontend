import {
  getUserFirstName,
  getUserLastName,
} from "@/utils/extractDetailsFromToken";

export const getUserFirstNameLastNameChar = async (): Promise<
  string | undefined
> => {
  const firstName = await getUserFirstName();
  const lastName = await getUserLastName();
  const firstAndLastChar =
    firstName && lastName
      ? firstName[0] + lastName[0]
      : firstName
      ? firstName[0]
      : "";
  return firstAndLastChar;
};
