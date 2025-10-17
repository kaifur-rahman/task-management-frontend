import AddEditUserModal from "@/components/team/AddEditUserModal";
import PageTitleAndActionBtn from "@/components/common/PageTitleAndActionBtn";

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
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
}

export default layout;
