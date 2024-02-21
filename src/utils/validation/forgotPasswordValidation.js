import * as Yup from "yup";

const forgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("** Invalid email address")
    .required("** Email is Required"),
});

export default forgotPasswordValidationSchema;
