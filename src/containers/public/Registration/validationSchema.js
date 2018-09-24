
import * as Yup from 'yup'

export const registrationSchema = Yup.object().shape({

  email: Yup.string()
    .email('Invalid Email address.')
    .required('Email is required.'),
  password: Yup.string()
    .required('Password is required.'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match.')
    .required('Confirm password is required.'),
  first_name: Yup.string()
    .required('First name is required.'),
  middle_name: Yup.string()
    .required('Middle name is required.'),
  last_name: Yup.string()
    .required('Last name is required.'),
  website: Yup.string()
    .required('Website is required.'),
})


 