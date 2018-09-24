
import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({

  // password: Yup.string()
  //   .min(6, "C'mon, your name is longer than that")
  //   .required('Password is required.'),
  email: Yup.string()
    .required('Username is required!')
    .matches(
      /^[a-zA-Z0-9_@.]+$/,
      {
        message: 'Invalid username.',
        excludeEmptyString: true,
      },
    ),
  remember_me: Yup.boolean()
    .required('remember me is required!'),
})


 