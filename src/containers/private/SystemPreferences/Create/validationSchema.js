
import * as Yup from 'yup'

export const userDetailsSchema = Yup.object().shape({
  logo: Yup.string(),
    //.required('logo is required!'),
  gps: Yup.string()
    .required('GPS Radius is required!'),
  contact_email_address_mobile: Yup.string()
    .email("Invalid Email")
    .required('Contact Email Address is required!'),
  contact_number_mobile: Yup.string()
    .required('Contact Number is required!'),
  contact_details: Yup.string()
    .email("Invalid Email")
    .required('Contact Details is required!')
})


 