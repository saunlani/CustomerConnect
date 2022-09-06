import { Request, Response, NextFunction } from "express"
import { AnySchema } from "yup"

export const validateSchema = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
  let body: Object = {}
  if (Object.keys(req.params).length) {
    body = req.params
  }
  else if (req.body) {
    body = req.body
  }
  try {
    await schema.validate(body)
    return next()
  }
  catch (error) {
    return res.status(400).json({ error })
  }
}