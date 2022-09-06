import { customerRouter } from './customer/customer'
import { Application } from "express"

export const routes = (app: Application) => {
  app.use('/api/v1/customers', customerRouter())
}