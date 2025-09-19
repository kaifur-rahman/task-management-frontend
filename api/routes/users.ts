export const postLoginRoute = () => {
  return "/users/login";
};

export const postValidateTokenRoute = () => {
  return "/users/validate-token";
};

export const postRefreshTokenRoute = () => {
  return "/users/refresh-token";
};

export const getLoginRoute = () => {
  return "/users/logout";
};

export const postCreateUser = () => {
  return "/users/create";
};

export const putUpdateUserRoute = (empId: string) => {
  return `/users/update/${empId}`;
};
export const getUsersRoute = () => {
  return "/users";
};

export const getMembersForProjectRoute = () => {
  return "/users/members-for-project";
};

export const deleteUserRoute = (empId: string) => {
  return `/users/delete/${empId}`;
};
