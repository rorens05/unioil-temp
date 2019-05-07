
import * as Yup from 'yup'

export const userDetailsSchema = Yup.object().shape({
  logo: Yup.string()
     .required('Upload Image is required!'),
  gps: Yup.string()
    .trim()
		.max(128, "Maximum character is 128.")
    .required('GPS Radius is required!'),
  contact_email_address_mobile: Yup.string()
    .trim()
		.max(128, "Maximum character is 128.")
    .email("Invalid Contact Email Address.")
    .required('Contact Email Address is required!'),
  contact_number_mobile: Yup.string()
    .required('Contact Number is required!'),
  contact_details: Yup.string()
    .trim()
		.max(128, "Maximum character is 128.")
    .email("Invalid Contact Details.")
    .required('Contact Details is required!'),
  information_guide_details: Yup.string()
    .trim()
    .max(100, "Maximum character is 100.")
})


 