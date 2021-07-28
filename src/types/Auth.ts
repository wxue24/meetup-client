interface signupData extends loginData{
    confirmPassword: string,
    handle: string
}

interface signupErrors extends loginErrors{
  confirmPassword?: string;
  handle?: string;
}

interface loginData {
  email: string;
  password: string;
}

interface loginErrors {
  email?: string;
  password?: string;
}
