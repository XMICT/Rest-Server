import type { NextFunction, Request, Response } from 'express'
import { ValidateSchema, type Validations } from '../../services/validate-schema.service.js'

const validateSchema = (
  fields: string[],
  options?: Validations
) => (req: Request, res: Response, next: NextFunction) => {
  const body = req.body

  const validator = new ValidateSchema(options)
  validator.execute(body, fields)
  next()
}

export default validateSchema
