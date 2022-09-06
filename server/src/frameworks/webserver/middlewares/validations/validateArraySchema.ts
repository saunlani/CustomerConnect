import { Request, Response, NextFunction } from "express"
import { AnySchema } from "yup"

export const validateArraySchema = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    for (let i in req.body) {
      await schema.validate(req.body[i])
    }
    return next()
  }
  catch (error) {
    return res.status(400).json({ error })
  }
}