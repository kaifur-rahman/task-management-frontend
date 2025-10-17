import Topbar from "@/components/common/Topbar";
import Sidebar from "@/components/common/Sidebar";

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className=" h-full w-full flex flex-col">
        <Topbar />
        <div className="flex flex-row h-full  w-full ">
          <Sidebar />
          <div
            id="team-layout"
            className="flex-1 w-full h-full md:ml-[4rem] justify-center items-center p-4 pt-16  overflow-y-auto"
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default layout;
