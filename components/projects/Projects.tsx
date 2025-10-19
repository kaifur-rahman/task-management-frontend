import AddNewProjectModal from "./AddNewProjectModal";
import ProjectFilterHeader from "./ProjectFilterHeader";
import { getUserRole } from "@/utils/extractDetailsFromToken";
import PageTitleAndActionBtn from "../common/PageTitleAndActionBtn";
import { getMyProjectsAction } from "@/actions/project/getMyProjects";

async function Projects() {
  const userRole = await getUserRole();
  const { success, message, data } = await getMyProjectsAction();

  if (!success) {
    return <h6>There is some problem loading this page, kindly re login</h6>;
  }
  return (
    <>
      {userRole === "Admin" || userRole === "Lead" ? (
        <PageTitleAndActionBtn
          pageTitle="Projects"
          actionBtnLabel={
            userRole == "Admin" || userRole === "Lead" ? "+ New Project" : null
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
      ) : null}
      <ProjectFilterHeader />
    </>
  );
}

export default Projects;
