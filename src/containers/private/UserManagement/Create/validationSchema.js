
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
    .required('Email is required!'),
  role: Yup.string()
    .required('Role is required!'),
  password: Yup.string()
    .required('Default Password is required!')
})


 