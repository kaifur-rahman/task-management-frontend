import Project from "./Project";
import { getArchivedProjectsAction } from "@/actions/project/getArchivedProjects";
import { IProject } from "@/interface/projects";

async function ArchivedProjects() {
  const { success, message, data } = await getArchivedProjectsAction();
  if (!success) {
    return (
      <h6>There is some problem fetching proejcts try logging in again</h6>
    );
  }
  return (
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
  );
}

export default ArchivedProjects;
