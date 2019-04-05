
import * as Yup from 'yup'

export const userDetailsSchema = Yup.object().shape({
  code: Yup.string()
    .trim()
    .max(128, "Maximum character is 128.")
    //.max(12,"Card Code must be 12 characters only. "),
    .required('Card Code is required!'),
  type: Yup.string()
    .trim()
    .max(128, "Maximum character is 128.")
    .required('Card Type Description is required!'),
  description: Yup.string()
    .trim()
    .max(140, "Maximum character is 140.")
    .required('Card Type Short Description is required!'),
  image: Yup.string()
    .required('Upload Card Type Image is required!'),
  bg_image: Yup.string()
    .required('Upload Card Type Cover Image is required!'),
  terms_and_conditions: Yup.string()
    .trim()
		.max(32000, "Maximum character is 32,000.")
    .required('Terms and Condition is required!'),
  faqs: Yup.string()
    .trim()
		.max(32000, "Maximum character is 32,000.")
    .required('FAQs is required!'),
  id_number: Yup.string()
      .required('ID Number is required!'),
  // id_number_description: Yup.string()
	// 	  .trim()
	// 		.max(32000, "Maximum character is 32,000.")
  //     .required('ID Type Description is required!')
})


 