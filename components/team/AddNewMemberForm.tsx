"use client";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { IUserDetails } from "@/interface/user";
import { roles, subRoles } from "@/constants/users";
import { generatePassword } from "@/utils/generatePassword";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

type TAddNewMemberForm = {
  edit: boolean;
  action: any;
  values: any;
  editValues: IUserDetails;
};

function AddNewMemberForm({
  action,
  values,
  editValues,
  edit,
}: TAddNewMemberForm) {
  const [password, setPassword] = useState(values?.password ?? "");
  const [role, setRole] = useState(
    edit ? editValues?.role ?? "" : values?.role ?? ""
  );

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleGeneratePasswordClick = async () => {
    const newPassword = await generatePassword();
    setPassword(newPassword);
  };
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  return (
    <>
      <form
        id="add-member-form"
        className="w-full h-full overflow-y-auto"
        action={action}
      >
        <div className="w-full h-full flex flex-col gap-8  mt-4 items-start p-2">
          <input
            type="text"
            name="empId"
            placeholder="Emp ID"
            required
            defaultValue={values?.empId ?? editValues?.emp_id ?? ""}
            className="w-full focus:border-2 focus:outline-none border-solid border-primary border-1 rounded-sm h-10 p-2 active:border-2 active:border-primary focus:border-primary"
          ></input>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            required
            defaultValue={values?.firstName ?? editValues?.first_name ?? ""}
            className="w-full  focus:border-2 focus:outline-none border-solid border-primary border-1 rounded-sm h-10 p-2 active:border-2 active:border-primary focus:border-primary"
          ></input>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            defaultValue={values?.lastName ?? editValues?.last_name ?? ""}
            className="w-full  focus:border-2 focus:outline-none border-solid border-primary border-1 rounded-sm h-10 p-2 active:border-2 active:border-primary focus:border-primary"
          ></input>
          <input
            type="email"
            name="email"
            placeholder="Email"
            defaultValue={values?.email ?? editValues?.email ?? ""}
            className="w-full  focus:border-2 focus:outline-none border-solid border-primary border-1 rounded-sm h-10 p-2 active:border-2 active:border-primary focus:border-primary"
          ></input>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            defaultValue={values?.phone ?? editValues?.phone ?? ""}
            required
            className="w-full focus:border-2 focus:outline-none border-solid border-primary border-1 rounded-sm h-10 p-2 active:border-2 active:border-primary focus:border-primary"
          ></input>
          <select
            required
            name="role"
            value={role}
            onChange={handleRoleChange}
            className="w-full border border-primary rounded-sm h-10 p-2 focus:border-2 focus:border-primary focus:outline-none appearance-none bg-white"
          >
            <option value="" selected>
              Select Role
            </option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <select
            name="subRole"
            defaultValue={values?.subRole ?? editValues?.sub_role ?? ""}
            className="w-full border border-primary rounded-sm h-10 p-2 focus:border-2 focus:border-primary focus:outline-none appearance-none bg-white"
          >
            <option value="" selected>
              Select Sub Role
            </option>
            {subRoles.map((subRole) =>
              (role == "Lead" && subRole == "Purchaser") ||
              (role == "Member" && subRole == "Purchase Lead") ||
              role == "Admin" ? null : (
                <option key={subRole} value={subRole}>
                  {subRole}
                </option>
              )
            )}
          </select>
          <div className="w-full flex flex-row items-center">
            <input
              type="text"
              name="password"
              required={edit ? false : true}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              className="w-full  focus:border-2 focus:outline-none border-solid border-primary border-1 rounded-sm h-10 p-2 active:border-2 active:border-primary focus:border-primary"
            ></input>
            <IconButton
              className="group"
              onClick={handleGeneratePasswordClick}
              sx={{ color: "#faa325", ml: "0.1rem" }}
            >
              <AutorenewIcon />
              <span className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 text-sm rounded-md bg-secondary text-white">
                Generate Password
              </span>
            </IconButton>

            <IconButton
              className="group"
              onClick={() => navigator.clipboard.writeText(password)}
              sx={{ color: "#faa325", ml: "-0.2rem" }}
            >
              <ContentCopyIcon />
              <span className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 text-sm rounded-md bg-secondary text-white">
                Copy
              </span>
            </IconButton>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddNewMemberForm;
