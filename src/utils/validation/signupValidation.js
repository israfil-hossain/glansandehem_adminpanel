import { object, string } from 'yup';

const signupValidationSchema = object({
    fullName: string().required("Name is Required"),
    email:string().email().required("Email is Required"),
    phoneNumber: string().matches(/^[0-9]+$/, 'Phone Number must contain only digits')
    .required('Phone Number is required'),
    
})

export default signupValidationSchema; 