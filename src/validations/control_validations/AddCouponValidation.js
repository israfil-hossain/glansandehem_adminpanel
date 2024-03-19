import { object, string, number } from "yup";

const addCouponValidationSchema = object({
  couponCode: string()
    .required("Coupon is Required")
    .min(6, "Coupon must be at least 6 characters long"),
  discountPercentage: string().required("Discount Percentage is required"),
});

export default addCouponValidationSchema;
