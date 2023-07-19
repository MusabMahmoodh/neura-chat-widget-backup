export const nameValidator = (name: string) => {
  if (name.length < 3) {
    return {
      isValid: false,
      message: "Name must be at least 3 characters long",
    };
  }
  return {
    isValid: true,
    message: "",
  };
};

export const emailValidator = (email: string) => {
  if (!email.includes("@") && !email.includes(".") && email.length < 5) {
    return {
      isValid: false,
      message: "Email must be a valid email address",
    };
  }
  return {
    isValid: true,
    message: "",
  };
};

export const phoneValidator = (mobilenumber: string) => {
  const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
  if (mobilenumber?.length < 10 || !phoneRegex.test(mobilenumber)) {
    return {
      isValid: false,
      message: "Phone number must be a valid phone number",
    };
  }
  return {
    isValid: true,
    message: "",
  };
};
