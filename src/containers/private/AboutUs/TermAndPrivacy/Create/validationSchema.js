
import * as Yup from 'yup'

export const userDetailsSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
		.max(128, "Maximum character is 128.")
    .required('Title is required!'),
  details: Yup.string()
    .trim()
		.max(32000, "Maximum character is 32,000.")
    .required('Details is required!'),
  // type: Yup.string()
  //   .required('Type is required!')
})


 