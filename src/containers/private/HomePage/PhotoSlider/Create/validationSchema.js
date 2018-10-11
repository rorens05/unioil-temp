
import * as Yup from 'yup'

export const userDetailsSchema = Yup.object().shape({
  promotion_uuid: Yup.string()
    .required('Branches is required!'),
  title: Yup.string()
    .required('Title is required!'),
  description: Yup.string()
    .required('Description is required!'),
  // image: Yup.string()
  //   .required('Image is required!'),
  date_start: Yup.string()
    .required('Start Appearance Date is required!'),
  date_end: Yup.string()
    .required('End Appearance Date is required!'),
})


 