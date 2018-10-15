
import * as Yup from 'yup'

export const userDetailsSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required!')
    .matches(
      /^[a-zA-Z0-9_@. ]+$/,
      {
        message: 'Invalid username.',
        excludeEmptyString: true,
      },
    ),
  firstname: Yup.string()
    .required('First Name is required!'),
  lastname: Yup.string()
    .required('Last Name is required!'),
  email: Yup.string()
    .required('Email is required!')
    .matches(/^[A-Za-z0-9@_. ]+$/, { excludeEmptyString: false, message: "Invalid characters" })
    .email("Invalid Email"),
  role: Yup.string()
    .required('Role is required!'),
  status: Yup.string()
    .required('Status is required!'),
  password: Yup.string()
    .required('Default Password is required!')
})


 