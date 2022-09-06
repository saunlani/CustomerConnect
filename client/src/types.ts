export type EditingCustomer = {
  id: string,
  isActive: boolean,
  company: string,
  industry: string,
  about: string,
  project: Project,
  projects: Project[],
  numberOfProjects: number
}

export type Customer = {
  id: string,
  isActive: boolean,
  company: string,
  industry: string,
  about: string
  projects: Project[]
}

export type Project = {
  id: string,
  name: string,
  contact: string,
  start_date: Date,
  end_date: Date
}

export type FormValues = {
  isActive: boolean,
  company: string,
  industry: string,
  about: string,
}