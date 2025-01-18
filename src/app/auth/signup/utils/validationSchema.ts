import * as Yup from 'yup'

const validationSchema = Yup.object({
  companyCode: Yup
    .string()
    .min(3, "Company code must be at least 3 characters long.")
    .max(20, "Company code must not exceed 20 characters.")
    .required("Company code is required."),
  firstname: Yup
    .string()
    .min(2, "First name must be at least 2 characters long.")
    .max(50, "First name must not exceed 50 characters.")
    .required("First name is required."),
  lastname: Yup
    .string()
    .min(2, "Last name must be at least 2 characters long.")
    .max(50, "Last name must not exceed 50 characters.")
    .required("Last name is required."),
  email: Yup
    .string()
    .email("Invalid email address.")
    .required("Email is required."),
  password: Yup
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(128, "Password must not exceed 128 characters.")
    .matches(
      /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    )
    .required("Password is required."),
});

export default validationSchema;
