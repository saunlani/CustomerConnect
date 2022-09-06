export const mapCustomerFromFormik = (values: any) => {
  // Create clone of values object and format it to be accepted by registerCustomer
  const clonedValues = structuredClone(values)
  // removes null values from form value object
  Object.keys(clonedValues).forEach(key => {
    if (clonedValues[key] === null || clonedValues[key] === '') {
      delete clonedValues[key]
    }
  })
  return clonedValues
}