"use client";
import { useState } from "react";
import { IconButton } from "@mui/material";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ProjectMembersModal from "./ProjectMembersModal";

function ProjectMembers({ lead, members }: TProjectMembers) {
  const [projectMembersModal, setProjectMembersModal] =
    useState<boolean>(false);

  return (
    <>
      <div className="group relative">
        <IconButton
          onClick={() => setProjectMembersModal(true)}
          size="small"
          sx={{ color: "", ml: "" }}
        >
          <Diversity3Icon />
          <span className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 text-sm rounded-md bg-secondary text-white">
            Members
          </span>
        </IconButton>
      </div>
      {projectMembersModal && (
        <ProjectMembersModal
          lead={lead}
          members={members}
          onClose={() => setProjectMembersModal(false)}
          containerId="modal-container"
        />
      )}
    </>
  );
}

type TProjectMembers = {
  lead: any;
  members: any;
};
export default ProjectMembers;
