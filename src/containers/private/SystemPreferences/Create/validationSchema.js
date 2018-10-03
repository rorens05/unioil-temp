
import * as Yup from 'yup'

export const userDetailsSchema = Yup.object().shape({
  logo: Yup.string(),
    //.required('logo is required!'),
  gps: Yup.string(),
    //.required('gps is required!'),
  contact_email_address_mobile: Yup.string()
    .email("Invalid Email"),
    //.required('contact_email_address_mobile is required!'),
  contact_number_mobile: Yup.string(),
  //.required('contact_number_mobile is required!'),
  contact_details: Yup.string()
    //.required('contact_details is required!')
})


 