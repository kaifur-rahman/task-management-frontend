"use client";
import { useActionState, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UpdateProjectForm from "./UpdateProjectForm";
import { updateProjectAction } from "@/actions/project/updateProject";

function UpdateProjectModal({
  projectDetails,
  containerId,
}: TAddNewProjectModal) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const initialResponse = { success: false, message: "", data: [] };

  const [
    updateProjectFormStatus,
    updateProjectFormAction,
    updateProjectIsPending,
  ] = useActionState(updateProjectAction, initialResponse);

  const onCancel = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (updateProjectFormStatus?.success && onCancel) onCancel();
  }, [updateProjectFormStatus]);

  const container =
    typeof window !== "undefined" ? document.getElementById(containerId) : null;

  if (!container) return null;

  const Modal = createPortal(
    <div className="bg-black/20 backdrop-blur-xs fixed inset-0 flex justify-center items-center z-99">
      <div className="h-[28rem] w-[30rem] bg-white rounded-3xl p-4">
        <div className="flex flex-col gap-4 items-start h-full justify-between p-4">
          {/* title */}
          <h6 className="font-extrabold text-xl tracking-wide">
            Update Project
          </h6>
          {/* error message */}
          <h6 className="text-red-500 font-semibold mt-2 -mb-4 pl-2">
            {
              // add mode show add errors
              !updateProjectFormStatus?.success &&
              updateProjectFormStatus?.message
                ? updateProjectFormStatus?.message.includes(
                    "UNIQUE constraint failed"
                  )
                  ? "Email/Phone already exists"
                  : updateProjectFormStatus?.message
                : ""
            }
          </h6>
          <UpdateProjectForm
            action={updateProjectFormAction}
            data={projectDetails}
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
              disabled={updateProjectIsPending}
              form="update-project-form"
              className="bg-primary w-[6rem] rounded-md text-white hover:cursor-pointer hover:bg-primary/90 font-semibold tracking-wide active:bg-primary/70 disabled:cursor-not-allowed disabled:bg-primary/30"
            >
              {updateProjectIsPending ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    container
  );

  return (
    <>
      <div className="group">
        <IconButton
          size="small"
          sx={{ color: "", ml: "" }}
          onClick={() => setOpenModal(true)}
        >
          <EditIcon />
          <span className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 text-sm rounded-md bg-secondary text-white">
            Update
          </span>
        </IconButton>
      </div>
      {openModal && Modal}
    </>
  );
}

type TAddNewProjectModal = {
  projectDetails: any;
  containerId: string;
};

export default UpdateProjectModal;
