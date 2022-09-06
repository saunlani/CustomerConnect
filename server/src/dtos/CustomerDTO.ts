import { ProjectDTO } from './ProjectDTO'

export class CustomerDTO {
  id?: string
  isActive: boolean
  company: string
  about?: string
  industry?: string
  projects?: ProjectDTO[]
}