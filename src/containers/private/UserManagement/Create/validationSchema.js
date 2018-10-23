
import * as Yup from 'yup'

export const userDetailsSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .required('Username is required!')
    .matches(
      /^[a-zA-Z0-9_@.ñÑ ]+$/,
      {
        message: 'Invalid Username.',
        excludeEmptyString: true,
      },
    ),
  firstname: Yup.string()
    .trim()
    .matches(/^[A-Za-z ñÑ-]+$/, { excludeEmptyString: false, message: "Invalid First Name" })
    .required('First Name is required!'),
  lastname: Yup.string()
    .trim()
    .matches(/^[A-Za-z ñÑ-]+$/, { excludeEmptyString: false, message: "Last Name" })
    .trim()
    .required('Last Name is required!'),
  email: Yup.string()
    .trim()
    .required('Email is required!')
    .matches(/^[A-Za-z0-9@_.ñÑ ]+$/, { excludeEmptyString: false, message: "Email Address" })
    .email("Invalid Email"),
  role: Yup.string()
    .required('Role is required!'),
  status: Yup.string()
    .required('Status is required!'),
  password: Yup.string()
    .required('Default Password is required!')
})


 