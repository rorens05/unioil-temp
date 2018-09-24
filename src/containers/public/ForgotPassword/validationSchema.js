
import * as Yup from 'yup'

export const forgotPasswordSchema = Yup.object().shape({
  newpassword: Yup.string()
    .required('New password is required!')
    .matches(
      /^[a-zA-Z0-9_@.]+$/,
      {
        message: 'Invalid username.',
        excludeEmptyString: true,
      },
    ),
  confirmpassword: Yup.boolean()
    .required('Confirm password is required!')
})


 