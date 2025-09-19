"use client";

import { ReactNode, useState } from "react";

type TPageTitleAndActionBtn = {
  pageTitle: string;
  actionBtnLabel?: string | null;
  onClickAction?: () => void;
  modalComponent?: ReactNode;
};

function PageTitleAndActionBtn({
  pageTitle,
  actionBtnLabel,
  onClickAction,
  modalComponent,
}: TPageTitleAndActionBtn) {
  const [openModal, setOpenModal] = useState(false);

  const handleActionBtnClick = () => {
    if (onClickAction) {
      onClickAction();
    } else if (modalComponent) {
      setOpenModal(true);
    }
  };

  return (
    <>
      <div className=" p-2 flex flex-row justify-between items-center h-auto">
        <h1 className="text-[2rem] font-bold tracking-wide">{pageTitle}</h1>
        {actionBtnLabel && (
          <button
            onClick={handleActionBtnClick}
            type="submit"
            className="bg-primary rounded-xl h-10 min-w-40 w-fit p-2 text-white font-bold -mt-2 cursor-pointer hover:bg-primary/90 transition-colors active:bg-primary/70 disabled:opacity-50"
          >
            {actionBtnLabel}
          </button>
        )}
      </div>
      {openModal &&
        modalComponent &&
        (typeof modalComponent === "object"
          ? {
              ...modalComponent,
              props: {
                ...modalComponent.props,
                onCancel: () => setOpenModal(false),
              },
            }
          : null)}
    </>
  );
}

export default PageTitleAndActionBtn;
