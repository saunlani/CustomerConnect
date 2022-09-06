import { CustomerDTO } from '../../dtos/CustomerDTO'
import { CustomerModel } from '../../frameworks/database/mongoDB/models/customer'
// Update Customer by Id
export const updateById = async (customer: CustomerDTO) => {
  const updatedCustomer = new CustomerModel({
    _id: customer.id,
    about: customer.about,
    isActive: customer.isActive,
    company: customer.company,
    industry: customer.industry
  })
  let foundCustomer = await CustomerModel.findById(customer.id)
  if (foundCustomer) {
    foundCustomer._id = updatedCustomer._id,
      foundCustomer.about = updatedCustomer.about,
      foundCustomer.isActive = updatedCustomer.isActive,
      foundCustomer.company = updatedCustomer.company,
      foundCustomer.industry = updatedCustomer.industry,
      await foundCustomer.save()
  }
  return foundCustomer
}