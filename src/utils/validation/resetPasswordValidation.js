import * as Yup from "yup";

const resetPasswordValidationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "** Password must be at least 6 characters")
    .required("** Password is Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "** Passwords must match")
    .required("** Confirm Password is Required"),
});

export default resetPasswordValidationSchema;
