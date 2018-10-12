
import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required!')
    .matches(
      /^[A-Za-z0-9_@. ]+$/,
      {
        message: 'Invalid username.',
        excludeEmptyString: true,
      },
    ),
  //password: Yup.string()
  
    //.min(10,'Atleast 10 character')
    // .matches(
    //   /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
    //   {
    //     message: 'Invalid password atleast 1 upper and lower case letter, 1 special character , 1 numbers.',
    //     excludeEmptyString: true,
    //   },
    // )
})


 