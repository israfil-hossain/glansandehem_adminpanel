import * as Yup from "yup";

const resetPasswordValidationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
      message:
        "** New password must contain at least one uppercase letter, one lowercase letter, and one number, and be at least 8 characters long",
      excludeEmptyString: true,
    })
    .required("** Password is Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "** Passwords must match")
    .required("** Confirm Password is Required"),
});


export default resetPasswordValidationSchema;
