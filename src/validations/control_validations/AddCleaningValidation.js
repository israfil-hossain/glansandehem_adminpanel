import { object, string, number } from 'yup';

const addCleaningValidationSchema = object({
  cleaningName: string().required("Cleaning Name is Required"),
  cleaningPrice: number()
    .required('Cleaning Price is required')
    .positive('Cleaning Price must be a positive number') // Fix error message
    .integer('Cleaning Price must be an integer'),
  content: string().required("Content is Required"),
});

export default addCleaningValidationSchema;
