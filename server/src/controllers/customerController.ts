import { findAll } from '../services/customer/findAll'
import { addCustomer } from '../services/customer/addCustomer'
import { addManyCustomers } from '../services/customer/addManyCustomers'
import { deleteById } from '../services/customer/deleteById'
import { updateById } from '../services/customer/updateById'
import { CustomerDTO } from '../dtos/CustomerDTO'

export const fetchAllCustomers = async () => {
  const customers = await findAll()
  return customers
}

export const createCustomer = async (customer: CustomerDTO) => {
  const createdCustomer = await addCustomer(customer)
  return createdCustomer
}

export const createManyCustomers = async (customers: CustomerDTO[]) => {
  const createdCustomers = await addManyCustomers(customers)
  return createdCustomers
}

export const updateCustomerById = async (customer: CustomerDTO) => {
  const updatedCustomer = await updateById(customer)
  return updatedCustomer
}

export const deleteCustomerById = async (id: string) => {
  const deletedCustomer = await deleteById(id)
  return deletedCustomer
}