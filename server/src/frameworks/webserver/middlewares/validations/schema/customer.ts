import * as yup from 'yup'

// This addMethod function looks for child properties within object,
// if any child property has a value, the object is rendered as required.
yup.addMethod<yup.AnySchema>(yup.object, "optional", function (
  isOptional = true,
  defaultValue = undefined
) {
  return this.transform(function (value) {
    if (!isOptional) return value
    if (
      value &&
      Object.values(value).some(v => !(v === null || v === undefined || v === ""))
    ) {
      return value
    }
    return defaultValue
  })
    .default(defaultValue)
})

export const registerCustomerSchema = yup.object({
  id: yup
    .string().uuid(),
  isActive: yup
    .string(),
  about: yup
    .string(),
  company: yup
    .string(),
  industry: yup
    .string(),
  projects: yup.array()
    .of(
      yup.object({
        id: yup.string().uuid(),
        name: yup.string().required(),
        contact: yup.string().nullable(),
        start_date: yup.date().required(),
        end_date: yup.date().nullable(),
      }).optional())
})
export const updateCustomerSchema = registerCustomerSchema.shape({
  id: yup
    .string().uuid()
    .defined()
})

export const deleteCustomerSchema = yup.object({
  id: yup
    .string().uuid()
    .defined()
})
