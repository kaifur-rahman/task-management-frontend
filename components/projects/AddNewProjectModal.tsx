"use client";
import { useActionState, useEffect } from "react";
import { createPortal } from "react-dom";
import NewProjectForm from "./AddNewProjectForm";
import { createNewProjectAction } from "@/actions/project/createNewProjects";

function AddNewProjectModal({
  title,
  actionBtnLabel,
  actionBtnLabelOnPending,
  onCancel,
  containerId,
}: TAddNewProjectModal) {
  const initialResponse = { success: false, message: "", data: [] };
  const [
    createNewProjectFormStatus,
    createNewProjectFormAction,
    creatingProjectIsPending,
  ] = useActionState(createNewProjectAction, initialResponse);

  useEffect(() => {
    if (createNewProjectFormStatus?.success && onCancel) onCancel();
  }, [createNewProjectFormStatus, onCancel]);

  const container =
    typeof window !== "undefined" ? document.getElementById(containerId) : null;

  if (!container) return null; // ✅ Prevents null errors

  return createPortal(
    <div className="bg-black/20 backdrop-blur-xs fixed inset-0 flex justify-center items-center z-99">
      <div className="h-[28rem] w-[30rem] bg-white rounded-3xl p-4">
        <div className="flex flex-col gap-4 items-start h-full justify-between p-4">
          {/* title */}
          <h6 className="font-extrabold text-xl tracking-wide">{title}</h6>
          {/* error message */}
          <h6 className="text-red-500 font-semibold mt-2 -mb-4 pl-2">
            {
              // add mode show add errors
              !createNewProjectFormStatus?.success &&
              createNewProjectFormStatus?.message
                ? createNewProjectFormStatus?.message.includes(
                    "UNIQUE constraint failed"
                  )
                  ? "Email/Phone already exists"
                  : createNewProjectFormStatus?.message
                : ""
            }
          </h6>
          <NewProjectForm action={createNewProjectFormAction} />
          <div className="w-full flex justify-end gap-10">
            <button
              onClick={onCancel}
              className="border-solid border-[1.5px] border-primary rounded-md w-[6rem] p-1 hover:cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={creatingProjectIsPending}
              form="add-project-form"
              className="bg-primary w-[6rem] rounded-md text-white hover:cursor-pointer hover:bg-primary/90 font-semibold tracking-wide active:bg-primary/70 disabled:cursor-not-allowed disabled:bg-primary/30"
            >
              {creatingProjectIsPending
                ? actionBtnLabelOnPending
                : actionBtnLabel}
            </button>
          </div>
        </div>
      </div>
    </div>,
    container
  );
}

type TAddNewProjectModal = {
  title: string;
  actionBtnLabel: string;
  actionBtnLabelOnPending: string;
  editValues?: any;
  onCancel?: () => void;
  containerId: string;
};

export default AddNewProjectModal;
