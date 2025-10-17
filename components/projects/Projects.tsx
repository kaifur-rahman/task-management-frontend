import AddNewProjectModal from "./AddNewProjectModal";
import ProjectFilterHeader from "./ProjectFilterHeader";
import PageTitleAndActionBtn from "../common/PageTitleAndActionBtn";
import { getMyProjectsAction } from "@/actions/project/getMyProjects";
import { getUserRole } from "@/utils/extractDetailsFromToken";

async function Projects() {
  const role = await getUserRole();
  const { success, message, data } = await getMyProjectsAction();

  if (!success) {
    return <h6>There is some problem loading this page</h6>;
  }
  return (
    <>
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
    </>
  );
}

export default Projects;
