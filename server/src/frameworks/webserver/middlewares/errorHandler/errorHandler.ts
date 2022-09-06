import { Request, Response, NextFunction } from "express"
import { MongoBulkWriteError, MongoServerError } from "mongodb"

// Passes errors to express error middleware
export const errorHandler = (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fn(req, res, next)
  } catch (error) {
    if (error instanceof MongoBulkWriteError && error.code === 11000) {
      if (error.insertedCount != 0) {
        return res.status(207).json({
          error: `${error.result.result.writeErrors.length} customer(s) could not be imported due to a duplicate id`,
        })
      }
      else {
        return res.status(409).json({
          error: `All ${error.result.result.writeErrors.length} customer(s) could not be imported due to a duplicate id`,
        })
      }
    }
    if (error instanceof MongoServerError && error.code === 11000) {
      return res.status(409).json({
        error: `A customer or project with this id already exists`,
      })
    }
    else {
      return res.status(500).json({ error: 'An unknown error has occurred' })
    }
  }
}