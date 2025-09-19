import Project from "./Project";
import AddNewProjectModal from "./AddNewProjectModal";
import ProjectFilterHeader from "./ProjectFilterHeader";
import PageTitleAndActionBtn from "../common/PageTitleAndActionBtn";
import { getArchivedProjectsAction } from "@/actions/project/getArchivedProjects";
import { IProject } from "@/interface/projects";
import { getUserRole } from "@/utils/extractDetailsFromToken";

async function ArchivedProjects() {
  const role = await getUserRole();
  const { success, message, data } = await getArchivedProjectsAction();
  if (!success) {
    return (
      <h6>There is some problem fetching proejcts try logging in again</h6>
    );
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
      <div className="flex h-auto flex-row gap-8 p-2 pb-4 flex-wrap w-full items-center mt-6">
        {data.length == 0 ? (
          <div className="w-full h-full flex justify-center items-center italic">
            <h6 className="text-secondaryText text-center">
              No projects are currently archived.
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

export default ArchivedProjects;
