// userFullName: data ? data?.userFullName : "",
//                     userEmail: data ? data?.userEmail : "", 
//                     userPhoneNumber:"", 
//                     userPidNumber:"",
//                     areaInSquareMeters:0,
//                     postalCode:null,
//                     address:"",
//                     cleaningDurationInHours:null, 
//                     cleaningPrice:"", 
//                     cleaningCoupon:"",
//                     startDate:"", 
//                     hasCats:null, 
//                     hasDogs:null, 
//                     hasOtherPets:null,

import { object, string, number } from "yup";

const addServiceValidation = object({
    userFullName: string()
    .required("Full Name is Required"),
    userEmail: string().email().required("Email is Required"),
    userPhoneNumber: string().required("Phone Number is Required"), 
    userPidNumber: string().required("Phone Number is Required"), 
    areaInSquareMeters

});

export default addServiceValidation;
                    