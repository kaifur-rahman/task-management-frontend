"use client";
export const getUserFirstNameLastNameChar = (
  firstName: string,
  lastName: string
) => {
  const firstAndLastChar =
    firstName && lastName
      ? firstName[0] + lastName[0]
      : firstName
      ? firstName[0]
      : "";
  return firstAndLastChar;
};
