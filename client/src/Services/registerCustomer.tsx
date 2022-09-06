import { Customer } from "../types"

export const registerCustomer = (data: Customer) =>
  fetch("http://localhost:5003/api/v1/customers", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json()
      }
      if (response.status === 409) {
        throw new Error('Duplicate key error')
      }
      else {
        throw new Error('Error occurred')
      }
    }).catch((error) => {
      throw new Error(error)
    })