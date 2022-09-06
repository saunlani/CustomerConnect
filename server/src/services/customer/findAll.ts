import { Customer, CustomerModel } from '../../frameworks/database/mongoDB/models/customer'
import { mapCustomerAsDTO } from '../../mappers/mapCustomerAsDTO'

export const findAll = async () => {
  const customers = await CustomerModel.find()
  const customersAsDTO = customers.map((customer: Customer) => mapCustomerAsDTO(customer))
  return customersAsDTO
}