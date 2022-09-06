import { Customer } from "../types"

export const deleteCustomer = (data: Customer) =>
  fetch(`http://localhost:5003/api/v1/customers/${data.id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      }
      if (response.status === 204) {
        throw new Error('No Customer found with this ID')
      }
      else {
        throw new Error('Error occurred')
      }
    }).catch((error) => {
      throw new Error(error)
    })