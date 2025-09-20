"use client";
import { useActionState } from "react";
import { createPortal } from "react-dom";
import AddNewMemberForm from "./AddNewMemberForm";
import { addNewUserAction } from "@/actions/user/addNewUser";
import { updateUserDetailsAction } from "@/actions/user/updateUserDetails";

type TAddEditUserModal = {
  title: string;
  actionBtnLabel: string;
  actionBtnLabelOnPending: string;
  edit: boolean;
  editValues?: any;
  onCancel?: () => void;
  containerId: string;
};

function AddEditUserModal({
  title,
  actionBtnLabel,
  actionBtnLabelOnPending,
  edit,
  editValues,
  onCancel,
  containerId,
}: TAddEditUserModal) {
  const initialResponse = { success: false, message: "", data: [] };

  const [addUserFormStatus, addUserFormAction, addUserIsPending] =
    useActionState(addNewUserAction, initialResponse);

  const [updateUserFormStatus, updateUserFormAction, updateUserIsPending] =
    useActionState(updateUserDetailsAction, initialResponse);

  const previousAddUserValues = addUserFormStatus?.data;
  const previousUpdateUserValues = updateUserFormStatus?.data;

  if (updateUserFormStatus?.success && onCancel) {
    onCancel();
  }

  if (addUserFormStatus?.success && onCancel) {
    onCancel();
  }

  return createPortal(
    <div className="bg-black/20 backdrop-blur-xs fixed inset-0 flex justify-center items-center z-99">
      <div className="h-[28rem] w-[30rem] bg-white rounded-3xl p-4">
        <div className="flex flex-col gap-4 items-start h-full justify-between p-4">
          {/* title */}
          <h6 className="font-extrabold text-xl tracking-wide">{title}</h6>
          {/* error message */}
          <h6 className="text-red-500 font-semibold mt-2 -mb-4 pl-2">
            {edit
              ? // edit mode show update errors
                !updateUserFormStatus?.success && updateUserFormStatus?.message
                ? updateUserFormStatus?.message.includes(
                    "UNIQUE constraint failed"
                  )
                  ? "Email/Phone already exists"
                  : updateUserFormStatus?.message
                : ""
              : // add mode show add errors
              !addUserFormStatus?.success && addUserFormStatus?.message
              ? addUserFormStatus?.message.includes("UNIQUE constraint failed")
                ? "Email/Phone already exists"
                : addUserFormStatus?.message
              : ""}
          </h6>
          <AddNewMemberForm
            edit={edit}
            action={edit ? updateUserFormAction : addUserFormAction}
            values={edit ? previousUpdateUserValues : previousAddUserValues}
            editValues={editValues}
          />
          <div className="w-full flex justify-end gap-10">
            <button
              onClick={onCancel}
              className="border-solid border-[1.5px] border-primary rounded-md w-[6rem] p-1 hover:cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={edit ? updateUserIsPending : addUserIsPending}
              form="add-member-form"
              className="bg-primary w-[6rem] rounded-md text-white hover:cursor-pointer hover:bg-primary/90 font-semibold tracking-wide active:bg-primary/70 disabled:cursor-not-allowed disabled:bg-primary/30"
            >
              {(edit && updateUserIsPending) || (!edit && addUserIsPending)
                ? actionBtnLabelOnPending
                : actionBtnLabel}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById(containerId)
  );
}

export default AddEditUserModal;
