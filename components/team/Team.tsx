import PageTitleAndActionBtn from "../common/PageTitleAndActionBtn";
import AddEditUserModal from "./AddEditUserModal";
import TeamDataTable from "./TeamDataTable";
import { getUsersData } from "@/actions/user/getUsers";

async function Team() {
  const { success, message, data } = await getUsersData();
  if (!success) {
    return (
      <h6 className="h-100 flex flex-1 justify-center items-center text-center font-semibold  text-primary tracking-wider text-xl">
        {message}
      </h6>
    );
  }
  return (
    <>
      <div className=" w-full h-full p-4">
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
        <TeamDataTable users={data} />
      </div>
    </>
  );
}

export default Team;
