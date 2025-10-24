import { IconButton } from "@mui/material";
import { IProject } from "@/interface/projects";
// import CallMadeIcon from "@mui/icons-material/CallMade";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import { updateArchivedAction } from "@/actions/project/updateArchived";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import { getUserEmpId, getUserRole } from "@/utils/extractDetailsFromToken";

async function Project({ project }: TProject) {
  const userEmpId = await getUserEmpId();
  const userRole = await getUserRole();

  return (
    <div className=" hover:bg-primary/10 flex flex-col gap-3 shadow-md justify-between  border-solid border-1 border-secondaryText/20 w-[22rem] h-auto min-h-[10rem]  rounded-xl p-3 hover:cursor-pointer">
      <div className=" flex flex-row justify-between items-center">
        {/* project name */}
        <h6 className="font-bold tracking-normal">{project.name}</h6>
        {/* action buttons */}
        <div className="flex flex-row gap-2 justify-end items-end">
          {/* archive action btn */}
          {userEmpId == project.lead.emp_id || userRole == "Admin" ? (
            <div className="group">
              <form id="project-archived-form" action={updateArchivedAction}>
                {/*pass project id and current value to form action*/}
                <input
                  type="hidden"
                  name="projectId"
                  value={project?.project_id}
                />
                <input
                  type="hidden"
                  name="archived"
                  value={project?.archived ? "true" : "false"}
                />
                <IconButton
                  form={"project-archived-form"}
                  type="submit"
                  size="small"
                  sx={{ color: "", ml: "" }}
                >
                  {project?.archived ? (
                    <UnarchiveOutlinedIcon />
                  ) : (
                    <ArchiveOutlinedIcon />
                  )}
                  <span className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 text-sm rounded-md bg-secondary text-white">
                    {project?.archived ? "Unarchive" : "Archive"}
                  </span>
                </IconButton>
              </form>
            </div>
          ) : null}
          {/* project member details */}
          <div className="group">
            <IconButton size="small" sx={{ color: "", ml: "" }}>
              <Diversity3Icon />
              <div
                className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 text-sm rounded-md bg-secondary text-white whitespace-normal"
                style={{ width: "max-content" }}
              >
                {project.lead.emp_id} {project.lead.first_name}{" "}
                {project.lead.last_name}{" "}
                <span className="italic">(P-Lead)</span>
                {project.members?.map((member) => (
                  <h6 key={member.emp_id} className="text-start">
                    {member.emp_id} {member.first_name} {member.last_name}{" "}
                    <span className="italic text-xs text-primary">
                      ({member.sub_role ?? member.role})
                    </span>
                  </h6>
                ))}
              </div>
            </IconButton>
          </div>
          {/* project details */}
          {/* <div className="group">
            <IconButton size="small" sx={{ color: "#faa325", ml: "0.1rem" }}>
              <CallMadeIcon />
              <span className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 text-sm rounded-md bg-secondary text-white">
                Details
              </span>
            </IconButton>
          </div> */}
        </div>
      </div>
      {/* horizontal line */}
      <div className="w-full border-t border-gray-300 -mt-4"></div>
      {/* project id */}
      <div className="w-full flex justify-end text-primary2 italic">
        {project.project_id}
      </div>
      {/* project description */}
      <h6 className="mt-2 text-secondaryText line-clamp-2 font-extralight">
        {project.description}
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
