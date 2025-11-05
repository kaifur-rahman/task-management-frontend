import { IProject } from "@/interface/projects";
// import CallMadeIcon from "@mui/icons-material/CallMade";
import DeleteProject from "./action-buttons/DeleteProject";
import ArchiveProject from "./action-buttons/ArchiveProject";
import ProjectMembers from "./action-buttons/ProjectMembers";
import UpdateProjectModal from "./action-buttons/UpdateProjectModal";
import { getUserEmpId, getUserRole } from "@/utils/extractDetailsFromToken";

async function Project({ project }: TProject) {
  const userEmpId = await getUserEmpId();
  const userRole = await getUserRole();

  return (
    <div className="mt-4  hover:bg-primary/10 flex flex-col gap-3 shadow-md justify-between  border-solid border-1 border-secondaryText/20 w-[22rem]  min-h-[12rem] max-h-[12rem]  rounded-xl p-3 hover:cursor-pointer">
      <div className=" flex flex-row justify-between items-center">
        {/* project name */}
        <h6 className="font-bold tracking-normal">{project.name}</h6>
        {/* ----action buttons--- */}
        <div className="flex flex-row gap-2 justify-end items-end">
          {/* delete action btn */}
          {userRole == "Admin" ? (
            <DeleteProject projectId={project?.project_id} />
          ) : null}
          {/* archive action btn */}
          {userEmpId == project.lead.emp_id || userRole == "Admin" ? (
            <ArchiveProject
              projectId={project?.project_id}
              currentlyArchived={project?.archived ? true : false}
            />
          ) : null}
          {/* update action btn */}
          {userEmpId == project.lead.emp_id || userRole == "Admin" ? (
            <UpdateProjectModal
              projectDetails={project}
              containerId="modal-container"
            />
          ) : null}
          {/* project member details */}
          <ProjectMembers lead={project?.lead} members={project?.members} />
        </div>
      </div>
      {/* horizontal line */}
      <div className="w-full border-t border-gray-300 -mt-4"></div>
      {/* project id */}
      <div className="w-full flex justify-end text-primary2 italic">
        {project.project_id}
      </div>
      {/* project description */}
      <h6 className="mt-2 text-secondaryText line-clamp-2 font-extralight ">
        {project.description?.length == 0 ? (
          <span className="font-light italic text-center w-full">
            No project description provided.
          </span>
        ) : (
          project?.description
        )}
      </h6>
      {/* auto progress */}
      {/* priority category and lead details */}
      <div className="flex justify-between">
        <div>
          <h6 className="text-sm text-secondaryText font-light italic">
            {project.priority}
          </h6>
        </div>
        <div>
          <h6 className="text-sm text-secondaryText font-light">
            {project.category}
          </h6>
        </div>
        {/* lead */}
        <div>
          <h6 className="text-sm text-secondaryText font-bold">
            {project.lead.first_name}
          </h6>
        </div>
      </div>
    </div>
  );
}

type TProject = {
  project: IProject;
};

export default Project;
