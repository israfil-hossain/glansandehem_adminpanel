import { object, string, number } from "yup";
import * as Yup from "yup";

const updateServiceValidation = object({
  areaInSquareMeters: number().required("Area is required"),
  cleaningDurationInHours: number().required("Cleaning Duration is Required"),
  subscriptionFrequency: string().required(
    "Subscription Frequency is Required"
  ),
});

export default updateServiceValidation;
