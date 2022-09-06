import { ProjectDTO } from "../dtos/ProjectDTO";
import { Project } from "../frameworks/database/mongoDB/models/customer";
import { mapProjectAsDTO } from "./mapProjectAsDTO";

export const mapProjectsAsDTO = (projects: Project[]): ProjectDTO[] => projects.map(project => mapProjectAsDTO(project))
