"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function ProjectFilterHeader() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="mt-4 w-full flex justify-center items-center gap-6 mb-2">
      <Link
        href={"/projects"}
        className={`text-xl hover:cursor-pointer  ${
          pathname === "/projects"
            ? "border-b-2 text-primary font-bold"
            : "text-secondaryText font-normal"
        }`}
      >
        My Projects
      </Link>
      <Link
        href={"/projects/all"}
        className={`text-xl hover:cursor-pointer p-[0.5rem]  ${
          pathname === "/projects/all"
            ? "border-b-2 font-bold  text-primary"
            : "text-secondaryText font-normal"
        }`}
      >
        All
      </Link>
      <Link
        href={"/projects/archived"}
        className={`text-xl hover:cursor-pointer p-[0.5rem]  ${
          pathname === "/projects/archived"
            ? "border-b-2 font-bold  text-primary"
            : "text-secondaryText font-normal"
        }`}
      >
        Archived
      </Link>
    </div>
  );
}

export default ProjectFilterHeader;
