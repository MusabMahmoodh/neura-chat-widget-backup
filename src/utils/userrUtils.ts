//get user data
export const getUserData = () => {
  const data = localStorage.getItem("userData");
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

//set user data
export const storeUserData = (data: any) => {
  localStorage.setItem("userData", JSON.stringify(data));
};
