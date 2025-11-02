import Project from "./Project";
import { IProject } from "@/interface/projects";
import { getMyProjectsAction } from "@/actions/project/getMyProjects";

async function MyProjects() {
  const { success, message, data } = await getMyProjectsAction();
  if (!success) {
    return <h6>There is some problem loading your projects</h6>;
  }

  return (
    <div className="flex flex-row gap-8 p-2 flex-wrap w-full items-center justify-baseline mt-6 overflow-y-auto ">
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
  );
}

export default MyProjects;
