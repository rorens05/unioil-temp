
import * as Yup from 'yup'

export const userDetailsSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required!'),
  details: Yup.string()
    .required('Details is required!'),
  // type: Yup.string()
  //   .required('Type is required!')
})


 