import { object, string, number } from 'yup';

const addCleaningValidationSchema = object({
  subscriptionPrice: number()
    .required('Cleaning Price is required')
    .positive('Cleaning Price must be a positive number') // Fix error message
    .integer('Cleaning Price must be an integer'),
});

export default addCleaningValidationSchema;
