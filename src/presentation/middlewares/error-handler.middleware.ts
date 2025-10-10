import type { NextFunction, Request, Response } from 'express'
import { CustomError, type CustomErrorInterface } from '../../utils/errors/custom.js'

export const errorHandlerMiddleware = (
  err: Error | CustomErrorInterface,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      message: err.message
    })
  }

  return res.status(500).json({
    message: 'Internal Server Error'
  })
}
