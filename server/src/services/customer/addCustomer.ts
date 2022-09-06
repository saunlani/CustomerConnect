import { CustomerModel } from '../../frameworks/database/mongoDB/models/customer'
import { CustomerDTO } from '../../dtos/CustomerDTO'

export const addCustomer = async (customer: CustomerDTO) => {
  const newCustomer = new CustomerModel({
    _id: customer.id,
    about: customer.about,
    isActive: customer.isActive,
    company: customer.company,
    industry: customer.industry,
  })
  return await newCustomer.save()
}
