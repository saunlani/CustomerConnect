import { mapCustomersFromApi } from "../Mappers/mapCustomersFromApi"

const requestOptions = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
}
export const getCustomers = () =>
  fetch("http://localhost:5003/api/v1/customers", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const mappedData = mapCustomersFromApi(data.data)
      return mappedData
    })
    .catch((error) => {
      throw new Error(error)
    })