import Project from "./Project";
import AddNewProjectModal from "./AddNewProjectModal";
import ProjectFilterHeader from "./ProjectFilterHeader";
import PageTitleAndActionBtn from "../common/PageTitleAndActionBtn";
import { getMyProjectsAction } from "@/actions/project/getMyProjects";
import { IProject } from "@/interface/projects";
import { getUserRole } from "@/utils/extractDetailsFromToken";

async function MyProjects() {
  const role = await getUserRole();
  const { success, message, data } = await getMyProjectsAction();
  if (!success) {
    return <h6>There is some problem loading proejcts</h6>;
  }
  return (
    <div className="w-full h-full p-4">
      <PageTitleAndActionBtn
        pageTitle="Projects"
        actionBtnLabel={
          role == "Admin" || role === "Lead" ? "+ New Project" : null
        }
        modalComponent={
          <AddNewProjectModal
            title="Add New Project"
            actionBtnLabel="Add"
            actionBtnLabelOnPending="Adding..."
            containerId="modal-container"
          />
        }
      />
      <ProjectFilterHeader />
      <div className="flex  flex-row gap-8 p-2 flex-wrap w-full items-center justify-baseline mt-6">
        {data.length == 0 ? (
          <div className="w-full h-full flex justify-center items-center italic">
            <h6 className="text-secondaryText text-center">
              You are not associated to any projects at the moment.{" "}
            </h6>
          </div>
        ) : (
          data.map((project: IProject) => (
            <Project key={project.project_id} project={project} />
          ))
        )}
      </div>
    </div>
  );
}

export default MyProjects;
