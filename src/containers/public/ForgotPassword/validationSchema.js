
import * as Yup from 'yup'

export const forgotPasswordSchema = Yup.object().shape({
  newpassword: Yup.string()
    .required('New password is required!'),
    //.min(10,'Atleast 10 character'),
    // .matches(
    //   /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
    //   {
    //     message: 'Invalid password atleast 1 upper and lower case letter, 1 special character and 1 numbers.',
    //     excludeEmptyString: true,
    //   },
    // ),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref('newpassword')], 'Passwords do not match.')
    .required('Confirm password is required.'),
    //.min(10,'Atleast 10 character')
    // .matches(
    //   /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
    //   {
    //     message: 'Invalid password atleast 1 upper and lower case letter, 1 special character and 1 numbers.',
    //     excludeEmptyString: true,
    //   },
    // )
    
})


 