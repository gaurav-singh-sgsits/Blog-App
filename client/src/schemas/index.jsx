import * as Yup from "yup";

// we have made a schema according to which our data would be validated

export const signUpSchema = Yup.object({
  username: Yup.string().min(2).max(25).required("Please Enter Your Name"),
  email: Yup.string().email().required("Please Enter Your Email"),
  password: Yup.string().min(6).required("Please Enter Your Password"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Password Must Match"),
  img: Yup.string(),
});

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please Enter Your Email"),
  password: Yup.string().min(6).required("Please Enter Your Password"),
});

export const postSchema = Yup.object({});
