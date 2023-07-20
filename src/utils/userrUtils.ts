//get user data
export const getUserData = () => {
  const data = localStorage.getItem("nueraChatUserData");
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

//set user data
export const storeUserData = (data: any) => {
  localStorage.setItem("nueraChatUserData", JSON.stringify(data));
};
