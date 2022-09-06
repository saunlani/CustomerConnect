import { Customer } from "../types"

export const updateCustomer = (data: Customer) =>
  fetch("http://localhost:5003/api/v1/customers", {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      }
      else {
        throw new Error('Error occurred')
      }
    }).catch((error) => {
      throw new Error(error)
    })