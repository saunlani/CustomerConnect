import { CustomerDTO } from '../../dtos/CustomerDTO'
import { CustomerModel, Customer } from '../../frameworks/database/mongoDB/models/customer'
// Register more than one Customer
export const addManyCustomers = async (customerArray: CustomerDTO[]) => {
  let mappedCustomerArray: Array<Customer> = []

  customerArray.forEach((customer) => {
    const newCustomer = new CustomerModel({
      _id: customer.id,
      isActive: customer.isActive,
      company: customer.company,
      about: customer.about,
      industry: customer.industry
    })
    if (customer.projects) {
      customer.projects.forEach((project) => {
        newCustomer.projects.push(project)
      })
      mappedCustomerArray.push(newCustomer)
    }
  })
  return await CustomerModel.insertMany(mappedCustomerArray, { ordered: false })
}