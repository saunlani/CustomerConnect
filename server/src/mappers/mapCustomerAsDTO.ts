import { Customer } from '../frameworks/database/mongoDB/models/customer'
import { CustomerDTO } from '../dtos/CustomerDTO'
import { mapProjectsAsDTO } from './mapProjectsAsDTO'

export const mapCustomerAsDTO = (customer: Customer): CustomerDTO => ({
  id: customer._id,
  isActive: customer.isActive,
  company: customer.company,
  industry: customer.industry,
  about: customer.about,
  projects: mapProjectsAsDTO(customer.projects)
})