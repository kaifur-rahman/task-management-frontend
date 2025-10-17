import ActionButtons from "./ActionButtons";
import AccountStatus from "./AccountStatus";
import { IUserDetails } from "@/interface/user";
import { getUsersDataAction } from "@/actions/user/getUsers";
import { manageTeamTableHeaders } from "@/constants/team/tableHeaders";

async function TeamDataTable() {
  const { success, message, data } = await getUsersDataAction();
  if (!success) {
    return (
      <h6 className="h-100 flex flex-1 justify-center items-center text-center font-semibold  text-primary tracking-wider text-xl">
        {message}
      </h6>
    );
  }
  const users = data;
  return users?.length == 0 ? (
    <h6 className="h-100 flex flex-1 justify-center items-center text-center text-primary tracking-wider font-semibold text-xl">
      No team members have been added yet.
    </h6>
  ) : (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[900px]">
        {/* table header */}
        <div className="p-2 grid grid-cols-9 gap-6 mt-8">
          {manageTeamTableHeaders.map((header) => (
            <h6
              className="font-bold text-primary text-[1.12rem]"
              key={header.label}
            >
              {header.label}
            </h6>
          ))}
        </div>
        {/* table rows */}
        <div className="flex flex-col gap-4 pb-8 min-w-[45rem] mt-4">
          {users?.map((user: IUserDetails, idx: number) => (
            // parent div of row
            <div
              key={user.emp_id}
              className={`p-2 grid grid-cols-9 gap-6 items-center h-fit text-secondaryText hover:bg-secondary/5 hover:rounded-md mt-${
                idx == 0 ? "8" : "8"
              }`}
            >
              <h6 className="break-words">{user.emp_id}</h6>
              <h6 className="break-words">{user.first_name}</h6>
              <h6 className=" break-words">{user.last_name ?? "-"}</h6>
              <h6 className=" break-words">{user.role}</h6>
              <h6 className=" break-words">{user.sub_role ?? "-"}</h6>
              <h6 className="  break-words">{user.email ?? "-"}</h6>
              <h6 className="break-words">{user.phone}</h6>
              <AccountStatus status={user.status} />
              <ActionButtons user={user} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamDataTable;
