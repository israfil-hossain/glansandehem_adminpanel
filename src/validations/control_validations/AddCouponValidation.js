import { object, string, number } from 'yup';

const addCouponValidationSchema = object({
  couponName: string().required("Coupon Name is Required"),
  couponCode: string()
  .required("Coupon is Required")
  .min(6, "Coupon must be at least 6 characters long"),
});

export default addCouponValidationSchema;
