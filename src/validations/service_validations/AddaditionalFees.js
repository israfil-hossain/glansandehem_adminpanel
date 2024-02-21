import { object, string, number } from 'yup';

const addAdditionalValidationSchema = object({
 
    additionalFees: number()
    .required('Additional Fees is required')
    .positive('Additional Fees must be a positive number') // Fix error message
    .integer('Additional Fees must be an integer'),
  feesDescription: string().required("Fees Description is Required"),
});

export default addAdditionalValidationSchema;