import { object, string, number } from "yup";

const addServiceValidation = object({
    userFullName: string()
    .required("Full Name is Required"),
    userEmail: string().email().required("Email is Required"),
    userPhoneNumber: string().required("Phone Number is Required"), 
    userPidNumber: string().required("Phone Number is Required"), 
    areaInSquareMeters: number().required('Area is required'), 
    address:string().required("Address is Required"),
    cleaningDurationInHours:number().required("Cleaning Duration is Required"), 
    subscriptionFrequency:string().required("Subscription Frequency is Required"), 
    startDate:string().required("Duration is Required")


});

export default addServiceValidation;
                    