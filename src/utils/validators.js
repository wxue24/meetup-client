const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

const isEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  else return false;
};

export const validateSignup = (email, password, confirmPassword, handle) => {
  let errors = {};
  if (isEmpty(email)) {
    errors.email = "Email must not be empty";
  } else if (!isEmail(email)) {
    errors.email = "Must be a valid email address";
  }
  if (isEmpty(password)) errors.password = "Password must not be empty";
  if (password !== confirmPassword)
    errors.confirmPassword = "Passwords must match";
  if (isEmpty(handle)) errors.handle = "Username must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length > 0 ? false : true,
  };
};

export const validateLogin = (email, password) => {
  let errors = {};
  if (isEmpty(email)) {
    errors.email = "Email must not be empty";
  } else if (!isEmail(email)) {
    errors.email = "Must be a valid email address";
  }
  if (isEmpty(password)) errors.password = "Password must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length > 0 ? false : true,
  };
};
