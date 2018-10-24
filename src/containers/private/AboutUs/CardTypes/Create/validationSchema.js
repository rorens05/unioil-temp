
import * as Yup from 'yup'

export const userDetailsSchema = Yup.object().shape({
    code: Yup.string()
      .trim()
      .max(128, "Maximum character is 128.")
      //.max(12,"Card Code must be 20 characters only. "),
      .required('Card Code is required!'),
    type: Yup.string()
			.trim()
			.max(128, "Maximum character is 128.")
      .required('Card Type Description is required!'),
		description: Yup.string()
		  .trim()
			.max(32000, "Maximum character is 32,000.")
      .required('Card Type Short Description is required!'),
    // image: Yup.image()
    // .required('Image is required!'),
		terms_and_conditions: Yup.string()
		  .trim()
			.max(32000, "Maximum character is 32,000.")
      .required('Terms and Condition is required!'),
		faqs: Yup.string()
		  .trim()
			.max(32000, "Maximum character is 32,000.")
      .required('FAQs is required!')
})