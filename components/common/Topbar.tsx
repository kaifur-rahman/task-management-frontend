import Image from "next/image";
import MobNavbar from "./MobNavbar";
import { getUserFirstNameLastNameChar } from "@/actions/user/avatarDetails";

async function Topbar() {
  const firstAndLastChar = await getUserFirstNameLastNameChar();
  return (
    <div className="fixed top-0 left-0 right-0 h-12 z-50 flex justify-between items-center px-4 border-b-[0.5px] border-light bg-secondary">
      <Image
        src="/topbar-logo.png"
        alt="IRAI Engineering Logo"
        width={80}
        height={80}
        className="mt-2 ml-0 md:ml-16"
      />
      <div className="flex flex-row gap-4 items-center p-1">
        <div>
          {firstAndLastChar != "" && (
            <div className="bg-gray-300 w-9 h-9 rounded-full flex justify-center items-center">
              {firstAndLastChar}
            </div>
          )}
        </div>
        <div>
          <MobNavbar />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
