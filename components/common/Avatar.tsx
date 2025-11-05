"use client";

import { Suspense } from "react";
import { getUserFirstNameLastNameChar } from "@/actions/user/avatarDetails";

function Avatar({ firstName, lastName }: TAvatar) {
  const firstAndLastChar = getUserFirstNameLastNameChar(firstName, lastName);

  return (
    <Suspense
      fallback={
        <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
      }
    >
      <div>
        {firstAndLastChar != "" && (
          <div className="bg-gray-200 w-9 h-9 rounded-full flex justify-center items-center">
            {firstAndLastChar}
          </div>
        )}
      </div>
    </Suspense>
  );
}

type TAvatar = {
  firstName: string;
  lastName: string;
};

export default Avatar;
