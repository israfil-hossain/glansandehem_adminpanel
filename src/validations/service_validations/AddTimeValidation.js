import * as Yup from "yup";

const addTimeValidationSchema = Yup.object().shape({
    cleaningTime: Yup.date().required("Date and Time is required").nullable(),
});

export default addTimeValidationSchema;