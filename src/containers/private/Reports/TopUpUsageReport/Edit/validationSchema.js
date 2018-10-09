
import * as Yup from 'yup'

export const userDetailsSchema = Yup.object().shape({
  code: Yup.string()
    .required('Card Code is required!')
    .max(12,"Card Code must be 12 characters only. "),
  type: Yup.string()
    .required('Card Type is required!'),
  description: Yup.string()
    .required('Description is required!'),
  // image: Yup.image()
  // .required('Image is required!'),
  terms_and_conditions: Yup.string()
    .required('Terms and Condition is required!'),
  faqs: Yup.string()
    .required('FAQs is required!')
})


 