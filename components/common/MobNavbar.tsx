"use client";
import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { navItems } from "@/constants/sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAction } from "@/actions/user/logout";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Image from "next/image";

function MobNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    await logoutAction();
    localStorage.clear();
    router.replace("/login");
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  return (
    <div className="relative block md:hidden">
      {/* menu button */}
      <button
        className="hover:cursor-pointer focus:outline-none z-50 relative"
        onClick={toggleMenu}
      >
        {isOpen ? (
          <CloseIcon sx={{ color: "#ffffff" }} />
        ) : (
          <MenuIcon sx={{ color: "#ffffff" }} />
        )}
      </button>
      {/* sliding menu container */}
      <div
        className={`
          fixed top-0 left-0 w-full h-screen bg-secondary z-40 transform transition-transform duration-300 ease-in-out flex flex-col justify-center
          ${isOpen ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        {/* Logo */}
        <div className="flex justify-center items-center">
          <Image
            src="/sidebar-logo-full.png"
            alt="IRAI Engineering Logo"
            width={200}
            height={200}
            className="mt-4"
          />
        </div>
        {/* Menu content */}
        <div className="flex flex-col items-start justify-center w-full h-full space-y-8 px-6 overflow-y-auto mb-4">
          {navItems.map((navItem) => (
            <Link
              href={navItem.url}
              className={`group flex gap-3 text-white rounded-md p-2 
                       transition-colors duration-200 group-hover:cursor-pointer ${
                         navItem.paths.includes(pathname)
                           ? "group-hover:bg-primary2 hover:bg-primary2"
                           : "hover:bg-white/10"
                       } active:bg-primary/10`}
              key={navItem.name}
            >
              {/* Icons */}
              <navItem.Icon
                className={`transition-colors duration-200 ${
                  navItem.paths.includes(pathname)
                    ? "text-[#faa325]"
                    : "text-white"
                }
group-hover:text-white`}
              />
              {/* Labels */}
              <span
                className={`whitespace-nowrap 
                         duration-300 overflow-hidden ${
                           navItem.paths.includes(pathname)
                             ? "text-[#faa325] group-hover:text-white"
                             : "text-white"
                         }`}
              >
                {navItem.name}
              </span>
            </Link>
          ))}
          {/* Sign out */}
          <div
            className="flex items-center gap-3 text-white p-2 hover:bg-white/10 rounded-md hover:cursor-pointer"
            onClick={handleLogout}
          >
            <LogoutOutlinedIcon />
            <span className="whitespace-nowrap">Sign out</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobNavbar;
