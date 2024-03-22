import { object, string, number } from "yup";

const addAdditionalFeesValidationSchema = object({
    additionalCharges: number()
    .required("Additional Charge is Required"),
    remarks: string().required("Additional Fees Description Required"),
});

export default addAdditionalFeesValidationSchema;
