
import * as Yup from 'yup'

export const userDetailsSchema = Yup.object().shape({
  title: Yup.string()
    .required('Username is required!')
    .matches(
      /^[a-zA-Z0-9_@.]+$/,
      {
        message: 'Invalid username.',
        excludeEmptyString: true,
      },
    ),
})


 