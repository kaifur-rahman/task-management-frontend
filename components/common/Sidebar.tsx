"use client";
import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/constants/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { logoutAction } from "@/actions/user/logout";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = async () => {
    await logoutAction();
    localStorage.clear();
    router.replace("/login");
  };
  return (
    <div
      className="group bg-secondary h-full w-[4rem] hover:w-[14rem] fixed z-50 hidden md:flex 
                 flex-col justify-between p-2 transition-[width] ease-in-out duration-300 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex justify-center items-center overflow-hidden">
        <Image
          src="/sidebar-logo-icon.png"
          alt="IRAI Engineering Logo"
          width={150}
          height={150}
          className="transition-opacity duration-100 group-hover:opacity-0"
        />
        <Image
          src="/sidebar-logo-full.png"
          alt="IRAI Engineering Logo"
          width={150}
          height={150}
          className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>

      {/* Nav Items */}
      <div className="flex flex-col gap-6 p-2">
        {navItems.map((navItem) => (
          <Link
            href={navItem.url}
            className={`group flex gap-3 text-white  rounded-md p-2 
                       transition-colors duration-200 group-hover:cursor-pointer ${
                         navItem.paths.includes(pathname)
                           ? "group-hover:bg-primary2 hover:bg-primary2"
                           : "hover:bg-white/10"
                       } active:bg-primary/10`}
            key={navItem.name}
          >
            {/* Icon always visible */}
            <navItem.Icon
              className={`transition-colors duration-200 ${
                navItem.paths.includes(pathname)
                  ? "text-[#faa325]"
                  : "text-white"
              }
group-hover:text-white`}
            />

            {/* Label hidden until expanded */}
            <span
              className="whitespace-nowrap opacity-0 group-hover:opacity-100 
                         transition-opacity duration-300 overflow-hidden"
            >
              {navItem.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Sign out */}
      <div
        className="flex items-center gap-3 text-white p-4 hover:bg-white/10 rounded-md hover:cursor-pointer"
        onClick={handleLogout}
      >
        <LogoutOutlinedIcon />
        <span
          className="whitespace-nowrap opacity-0 group-hover:opacity-100 
                     transition-opacity duration-300"
        >
          Sign out
        </span>
      </div>
    </div>
  );
}

export default Sidebar;
