"use client";
import { useState } from "react";
import { IconButton } from "@mui/material";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import { updateArchivedAction } from "@/actions/project/archiveProject";
import {
  archiveProjectModalContent,
  unarchiveProjectModalContent,
} from "@/constants/projects/modals";

function ArchiveProject({ projectId, currentlyArchived }: TArchiveProject) {
  const [archiveProjectModal, setArchiveProjectModal] =
    useState<boolean>(false);
  const [archiveProjectError, setArchiveProjectError] = useState<string>("");

  const handleArchiveProjectModal = async () => {
    const { success, message, data } = await updateArchivedAction(
      projectId,
      currentlyArchived
    );
    if (!success) {
      setArchiveProjectError(message);
    }
    if (success) {
      setArchiveProjectError("");
      setArchiveProjectModal(false);
    }
  };

  return (
    <>
      <div className="group">
        <IconButton
          size="small"
          onClick={() => setArchiveProjectModal(true)}
          sx={{ color: "", ml: "" }}
        >
          {currentlyArchived ? (
            <UnarchiveOutlinedIcon />
          ) : (
            <ArchiveOutlinedIcon />
          )}
          <span className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 text-sm rounded-md bg-secondary text-white">
            {currentlyArchived ? "Unarchive" : "Archive"}
          </span>
        </IconButton>
      </div>
      {archiveProjectModal && (
        <ConfirmationModal
          title={
            currentlyArchived
              ? unarchiveProjectModalContent.title
              : !currentlyArchived
              ? archiveProjectModalContent.title
              : ""
          }
          message={
            currentlyArchived
              ? unarchiveProjectModalContent.message
              : !currentlyArchived
              ? archiveProjectModalContent.message
              : ""
          }
          errorMessage={archiveProjectError}
          onCancel={() => setArchiveProjectModal(false)}
          onConfirm={handleArchiveProjectModal}
          containerId={"modal-container"}
        />
      )}
    </>
  );
}

type TArchiveProject = {
  projectId: string;
  currentlyArchived: boolean;
};

export default ArchiveProject;
