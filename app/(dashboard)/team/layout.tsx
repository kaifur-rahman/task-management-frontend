import AddEditUserModal from "@/components/team/AddEditUserModal";
import PageTitleAndActionBtn from "@/components/common/PageTitleAndActionBtn";
import { getUserRole } from "@/utils/extractDetailsFromToken";

async function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const userRole = await getUserRole();
  if (userRole === "Admin") {
    return (
      <div className=" h-full w-full flex flex-col">
        <PageTitleAndActionBtn
          pageTitle="Manage Team"
          actionBtnLabel="+ Add Team"
          modalComponent={
            <AddEditUserModal
              title="Add New Member"
              actionBtnLabel="Add"
              actionBtnLabelOnPending="Adding..."
              edit={false}
              containerId="modal-container"
            />
          }
        />
        {children}
      </div>
    );
  } else {
    return <div className=" h-full w-full flex flex-col">{children}</div>;
  }
}

export default layout;
