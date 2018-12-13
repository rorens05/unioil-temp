
import * as Yup from 'yup'

export const userDetailsSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .max(128, "Maximum character is 128.")
    .required('Username is required!')
    .matches(
      /^[a-zA-Z0-9_@.ñÑ ]+$/,
      {
        message: 'Invalid username.',
        excludeEmptyString: true,
      },
    ),
  firstname: Yup.string()
    .trim()
    .max(128, "Maximum character is 128.")
    .matches(/^[A-Za-z ñÑ-]+$/, { excludeEmptyString: false, message: "Invalid First Name" })
    .required('First Name is required!'),
  lastname: Yup.string()
    .trim()
    .max(128, "Maximum character is 128.")
    .matches(/^[A-Za-z ñÑ-]+$/, { excludeEmptyString: false, message: "Invalid Last Name" })
    .required('Last Name is required!'),
  email: Yup.string()
    .max(128, "Maximum character is 128.")
    .required('Email is required!')
    .matches(/^[A-Za-z0-9@_.ñÑ ]+$/, { excludeEmptyString: false, message: "Invalid Email Address" })
    .email("Invalid Email Address"),
  role: Yup.string()
    .required('Role is required!'),
  status: Yup.string()
    .required('Status is required!'),
  password: Yup.string()
    .required('Default Password is required!')
})


 