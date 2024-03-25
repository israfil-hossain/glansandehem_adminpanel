import { object, string, number } from "yup";
import * as Yup from 'yup';

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
    startDate: Yup.date()
    .min(new Date(), "Start date cannot be before the current date")
    .required("Start date is required"),


});

export default addServiceValidation;
                    