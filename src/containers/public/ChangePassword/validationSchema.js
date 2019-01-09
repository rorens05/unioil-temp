
import * as Yup from 'yup'

export const changePasswordSchema = Yup.object().shape({
  newpassword: Yup.string()
    .required('New password is required!')
    .min(6,'Password must be alteast 6 characters')

    // .matches(
    //   /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
    //   {
    //     message: 'Invalid password atleast 1 upper and lower case letter, 1 special character and 1 numbers.',
    //     excludeEmptyString: true,
    //   },
    // ),

    .required('This field is required.')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain special character")
    .matches(/[a-z]/, "Password must contain small letter")
    .matches(/[A-Z]/, "Password must contain capital letter")
    .matches(/\d+/, "Password must contain number"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref('newpassword')], 'Passwords do not match.')
    .required('Confirm password is required')
})


 