import * as Yup from "yup";
const scheduleValidationSchema = Yup.object().shape({
  schedule: Yup.array().of(
    Yup.object().shape({
      selected: Yup.boolean(),
      startTime: Yup.string().when('selected', {
        is: true,
        then: Yup.string().required('Start Time is required'),
        otherwise: Yup.string(),
      }),
      endTime: Yup.string().when('selected', {
        is: true,
        then: Yup.string().required('End Time is required'),
        otherwise: Yup.string(),
      }),
    })
  ),
});


export default scheduleValidationSchema;
