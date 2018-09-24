
import * as Yup from 'yup'

export const userDetailsSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required!')
    .matches(
      /^[a-zA-Z0-9_@.]+$/,
      {
        message: 'Invalid username.',
        excludeEmptyString: true,
      },
    ),
})


 