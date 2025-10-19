"use client";
import { useState, useEffect } from "react";
import { useActionState } from "react";
import { createPortal } from "react-dom";

function ConfirmationModal({
  title,
  message,
  errorMessage,
  onCancel,
  onConfirm,
  containerId,
}: TConfirmationModal) {
  const [state, formAction, isPending] = useActionState(onConfirm, null);

  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(document.getElementById(containerId));
  }, [containerId]);

  if (!container) return null;

  return createPortal(
    <div className=" bg-black/20 backdrop-blur-xs fixed inset-0 flex justify-center items-center z-50">
      <div className="h-[18rem] w-[36rem] bg-white rounded-3xl p-4">
        <div className="flex flex-col gap-4 items-start h-full justify-between p-4">
          <h6 className="font-extrabold text-2xl tracking-wide">{title}</h6>
          {errorMessage != "" ? (
            <h6 className="text-red-500 font-semibold -mt-2 -mb-4">
              Error: {errorMessage}
            </h6>
          ) : null}
          <h6 className="tracking-wide">{message}</h6>

          <div className="w-full flex justify-end gap-10">
            <button
              onClick={onCancel}
              className="border-solid border-[1.5px] border-primary rounded-md w-[6rem] p-1 hover:cursor-pointer"
            >
              Cancel
            </button>
            <form action={formAction}>
              <button
                type="submit"
                disabled={isPending}
                className="bg-primary h-full w-[6rem] rounded-md text-white hover:cursor-pointer hover:bg-primary/90 font-semibold tracking-wide active:bg-primary/70 disabled:bg-primary/30 disabled:cursor-pointer"
              >
                {isPending ? "Confirm..." : "Confirm"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>,
    container
  );
}

type TConfirmationModal = {
  title: string;
  message: string;
  errorMessage?: string;
  onCancel: () => void;
  onConfirm: () => void;
  containerId: string;
};

export default ConfirmationModal;
