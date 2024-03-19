

import { object, string, number } from "yup";

const suppliesValidation = object({
    suppliesCharge: number()
    .required("Supplies Charge is Required")
});

export default suppliesValidation;
