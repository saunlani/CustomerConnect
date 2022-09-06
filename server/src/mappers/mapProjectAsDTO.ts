import { Project } from '../frameworks/database/mongoDB/models/customer'
import { ProjectDTO } from '../dtos/ProjectDTO'

export const mapProjectAsDTO = (project: Project): ProjectDTO => ({
  id: project._id,
  name: project.name,
  contact: project.contact,
  start_date: project.start_date,
  end_date: project.end_date
})
