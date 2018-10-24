
import * as Yup from 'yup'

export const userDetailsSchema = Yup.object().shape({
  promotion_uuid: Yup.string(),
    //.required('Promotion Name is required!'),
  title: Yup.string()
    .trim()
    .max(128, "Maximum character is 128.")
    .required('Title is required!'),
  description: Yup.string()
    .trim()
    .max(32000, "Maximum character is 32,000.")
    .required('Description is required!'),
  // image: Yup.string()
  //   .required('Image is required!'),
  date_start: Yup.string()
    .required('Start Appearance Date is required!'),
  date_end: Yup.string()
    .required('End Appearance Date is required!'),
  start_time: Yup.string()
      .required('Start Time is required!'),
  end_time: Yup.string()
      .required('End Time is required!'),
})


 