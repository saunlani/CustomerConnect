import { Customer } from "../types"
// re-usable mapper for reformatting data from API call
export const mapCustomersFromApi = (Customers: Customer[]) => {
  const modifiedRows = Customers.map((customer: Customer) => ({
    id: customer.id,
    company: customer.company,
    industry: customer.industry,
    isActive: customer.isActive,
    about: customer.about,
    projects: customer.projects,
    numberOfProjects: customer.projects.length
  }))
  return modifiedRows
}