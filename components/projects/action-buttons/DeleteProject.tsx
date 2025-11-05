"use client";
import { useState } from "react";
import { IconButton } from "@mui/material";
import ConfirmationModal from "../../common/ConfirmationModal";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteProjectAction } from "@/actions/project/deleteProject";
import { deleteProjectModalContent } from "@/constants/projects/modals";

function DeleteProject({ projectId }: TDeleteProject) {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string>("");

  const handleDeleteProject = async () => {
    const { success, message, data } = await deleteProjectAction(projectId);
    if (!success) {
      setDeleteError(message);
    }
    if (success) {
      setDeleteError("");
      setDeleteModal(false);
    }
  };

  return (
    <>
      <div className="group">
        <IconButton
          onClick={() => setDeleteModal(true)}
          size="small"
          sx={{ color: "", ml: "" }}
        >
          <DeleteOutlineIcon />
          <span className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 text-sm rounded-md bg-secondary text-white">
            Delete
          </span>
        </IconButton>
      </div>
      {deleteModal && (
        <ConfirmationModal
          title={deleteProjectModalContent.title}
          message={deleteProjectModalContent.message}
          errorMessage={deleteError}
          onCancel={() => setDeleteModal(false)}
          onConfirm={handleDeleteProject}
          containerId={"modal-container"}
        />
      )}
    </>
  );
}

type TDeleteProject = {
  projectId: string;
};

export default DeleteProject;
