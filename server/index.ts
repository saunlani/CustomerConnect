import express from "express"
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import { routes } from './src/frameworks/webserver/routes/v1/index'

dotenv.config()
const main = async () => {
  // connect to database server
  try {
    mongoose.connect(process.env.DB_URI, {
    }).then(() => {
      console.log('Database connection established!')
    })
  }
  catch (error) {
    console.error('Database connection failure: ', error)
  }
  // create web server
  try {
    const app = express()
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(cors())
    routes(app)
    app.listen(process.env.WEBSERVER_PORT, () => {
      console.log("Server now running on port", process.env.WEBSERVER_PORT)
    })
  }
  catch (error) {
    console.error("Failed to create server:", error)
  }
}
main()