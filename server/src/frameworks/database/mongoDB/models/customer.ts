import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const { Schema } = mongoose

export interface Project {
  _id?: string,
  name: string,
  contact?: string,
  start_date?: Date,
  end_date?: Date,
}

export interface Customer {
  _id?: string,
  isActive: boolean
  company: string
  industry?: string
  about?: string
  project?: Project
  projects: Project[]
}

const ProjectSchema = new Schema<Project>({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  contact: String,
  start_date: Date,
  end_date: Date
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})

const CustomerSchema = new Schema<Customer>({
  _id: { type: String, default: uuidv4 },
  isActive: { type: Boolean, default: true, required: true },
  company: String,
  industry: String,
  about: String,
  projects: [ProjectSchema],
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
})

export const CustomerModel = mongoose.model<Customer>("Customer", CustomerSchema)