import Project from "./Project";
import { IProject } from "@/interface/projects";
import { getAllProjectsAction } from "@/actions/project/getAllProjects";

async function AllProjects() {
  const { success, message, data } = await getAllProjectsAction();
  if (!success) {
    return <h6>There is some problem loading all proejcts</h6>;
  }
  return (
    <div className="flex h-auto flex-row gap-8 p-2 pb-4 flex-wrap w-full items-center mt-6">
      {data.length == 0 ? (
        <div className="w-full h-full flex justify-center items-center italic">
          <h6 className="text-secondaryText text-center">
            No projects are currently active in the company.
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

export default AllProjects;
