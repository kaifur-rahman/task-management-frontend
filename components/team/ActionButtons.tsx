"use client";
import { useState } from "react";
import { IUserDetails } from "@/interface/user";
import AddEditUserModal from "./AddEditUserModal";
import ConfirmationModal from "../common/ConfirmationModal";
import { deleteUserAction } from "@/actions/user/deleteUser";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  lockTeamMemberModalContent,
  unlockTeamMemberModalContent,
  deleteTeamMemberModalContent,
} from "@/constants/team/modals";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { updateUserStatusAction } from "@/actions/user/updateUserStatus";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

function ActionButtons({ user }: TActionButtons) {
  const [editModal, setEditModal] = useState<boolean>(false);
  const [lockUnlockModal, setLockUnlockModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const [lockUserActionError, setLockUserActionError] = useState<string>("");
  const [unlockUserActionError, setUnlockUserActionError] =
    useState<string>("");
  const [deleteActionError, setDeleteActionError] = useState<string>("");

  const handleEditModal = () => {
    setEditModal(!editModal);
  };
  const handleLockUnlockModal = () => {
    setLockUnlockModal(!lockUnlockModal);
  };

  const handleDeleteModal = () => {
    setDeleteModal(true);
  };

  const handleDeleteUser = async () => {
    const { success, message, data } = await deleteUserAction(user.emp_id);
    if (!success) {
      setDeleteActionError(message);
    }
    if (success) {
      setDeleteActionError("");
      setDeleteModal(false);
    }
  };

  const handleLockUser = async () => {
    const { success, message, data } = await updateUserStatusAction(
      user.emp_id,
      "Inactive"
    );
    if (!success) {
      setLockUserActionError(message);
    }
    if (success) {
      setLockUserActionError("");
      setLockUnlockModal(false);
    }
  };

  const handleUnlockUser = async () => {
    const { success, message, data } = await updateUserStatusAction(
      user.emp_id,
      "Active"
    );
    if (!success) {
      setUnlockUserActionError(message);
    }
    if (success) {
      setUnlockUserActionError("");
      setLockUnlockModal(false);
    }
  };

  return (
    <>
      <div className="flex flex-row">
        {/* edit button */}
        <div className="group relative flex items-center justify-center">
          <button
            onClick={handleEditModal}
            className="hover:cursor-pointer rounded-full p-2 hover:bg-primary/10 active:bg-primary/20"
          >
            <ModeEditOutlineOutlinedIcon sx={{ color: "#000000" }} />
          </button>
          <span className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 text-sm rounded-md bg-secondary text-white">
            Edit
          </span>
        </div>
        {/* lock unlock button */}
        <div className="group relative flex items-center justify-center">
          <button
            onClick={handleLockUnlockModal}
            className="hover:cursor-pointer rounded-full p-2 hover:bg-primary/10 active:bg-primary/20 -ml-2"
          >
            {user.status === "Active" ? (
              <LockOutlinedIcon sx={{ color: "#000000" }} />
            ) : (
              <LockOpenOutlinedIcon sx={{ color: "#000000" }} />
            )}
          </button>
          <span className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 text-sm rounded-md bg-secondary text-white">
            {user.status === "Active" ? "Lock" : "Unlock"}
          </span>
        </div>
        {/* delete button */}
        <div className="group relative flex items-center justify-center">
          <button
            onClick={handleDeleteModal}
            className=" hover:cursor-pointer rounded-full p-2 hover:bg-primary/10 active:bg-primary/20 -ml-2"
          >
            <DeleteOutlinedIcon sx={{ color: "#000000" }} />
          </button>
          <span className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 text-sm rounded-md bg-secondary text-white">
            Delete
          </span>
        </div>
      </div>
      {editModal && (
        <AddEditUserModal
          title={"Edit Member Detail"}
          actionBtnLabel={"Edit"}
          actionBtnLabelOnPending="Editing.."
          edit={true}
          editValues={user}
          onCancel={() => setEditModal(false)}
          containerId="modal-container"
        />
      )}
      {lockUnlockModal && (
        <ConfirmationModal
          title={
            user.status === "Active"
              ? lockTeamMemberModalContent.title
              : user.status === "Inactive"
              ? unlockTeamMemberModalContent.title
              : ""
          }
          message={
            user.status === "Active"
              ? lockTeamMemberModalContent.message
              : user.status === "Inactive"
              ? unlockTeamMemberModalContent.message
              : ""
          }
          errorMessage={
            user.status === "Active"
              ? lockUserActionError
              : user.status == "Inactive"
              ? unlockUserActionError
              : ""
          }
          onCancel={() => setLockUnlockModal(false)}
          onConfirm={
            user.status === "Active"
              ? handleLockUser
              : user.status === "Inactive"
              ? handleUnlockUser
              : () => setLockUnlockModal(false)
          }
          containerId="modal-container"
        />
      )}
      {deleteModal && (
        <ConfirmationModal
          title={deleteTeamMemberModalContent.title}
          message={deleteTeamMemberModalContent.message}
          errorMessage={deleteActionError}
          onCancel={() => setDeleteModal(false)}
          onConfirm={handleDeleteUser}
          containerId="modal-container"
        />
      )}
    </>
  );
}

type TActionButtons = {
  user: IUserDetails;
};

export default ActionButtons;
