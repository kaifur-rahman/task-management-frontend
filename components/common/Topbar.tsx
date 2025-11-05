import Image from "next/image";
import Avatar from "./Avatar";
import MobNavbar from "./MobNavbar";
import {
  getUserFirstName,
  getUserLastName,
} from "@/utils/extractDetailsFromToken";

async function Topbar() {
  const firstName = await getUserFirstName();
  const lastName = await getUserLastName();
  return (
    <div className="fixed top-0 left-0 right-0 h-16 z-50 flex justify-between items-center px-4 border-b-[0.5px] border-light bg-secondary">
      <Image
        src="/topbar-logo.png"
        alt="IRAI Engineering Logo"
        width={115}
        height={115}
        className="mt-2 ml-0 md:ml-16"
      />
      <div className="flex flex-row gap-4 items-center p-1">
        <Avatar firstName={firstName ?? ""} lastName={lastName ?? ""} />
        <div>
          <MobNavbar />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
