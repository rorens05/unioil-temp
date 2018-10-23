
import * as Yup from 'yup'

export const userDetailsSchema = Yup.object().shape({
  fee_code: Yup.string()
    .required('Free Code is required!'),
  name: Yup.string()
    .required('Name is required!')
    .trim()
    .matches(/^[A-Za-z0-9.ñÑ ]+$/, { excludeEmptyString: false, message: "Invalid Name" }),
  amount: Yup.number()
    .required('Amount is required!'),
  type: Yup.string()
})


 