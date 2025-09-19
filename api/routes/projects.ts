export const getAllProjectsRoute = () => {
  return "/projects";
};

export const getMyProjectsRoute = () => {
  return "/projects/my";
};

export const getArchivedProjectsRoute = () => {
  return "/projects/archived";
};

export const putUpdateProjectRoute = (projectId: string) => {
  return `/projects/update/${projectId}`;
};

export const postCreateNewProjectRoute = () => {
  return "/projects/create";
};
