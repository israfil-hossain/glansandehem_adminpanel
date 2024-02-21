import * as Yup from "yup";

const questionValidationSchema = Yup.object().shape({
 
  quizname : Yup.string().required("Quiz Name  is required"),
  question_name : Yup.string().required("Question Name is required"),
  options_a : Yup.string().required("Options A is required"),
  options_b : Yup.string().required("Options B is required"),
  options_c : Yup.string().required("Options C is required"),
  options_d : Yup.string().required("Options D is required"),
  options_e : Yup.string().required("Options E is required"),
  answer : Yup.string().required("Answer is required"),

  
});

export default questionValidationSchema;
