import * as yup from "yup"

export const CustomerSchema = yup.object().shape({
  isActive: yup.boolean(),
  company: yup.string().required('Company name is required'),
  industry: yup.string().nullable(),
  about: yup.string().nullable(),
})