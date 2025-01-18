import * as Yup from 'yup'

const validationSchema = Yup.object({
  companyCode: Yup
    .string()
    .min(3, "Company code must be at least 3 characters long.")
    .max(20, "Company code must not exceed 20 characters.")
    .required("Company code is required."),
  email: Yup
    .string()
    .email("Invalid email address.")
    .required("Email is required."),
  password: Yup
    .string()
    .required("Password is required."),
});

export default validationSchema;
