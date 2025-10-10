export interface CustomErrorInterface {
  message: string
  statusCode: number
}

export class CustomError extends Error {
  public readonly statusCode: number
  constructor (message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export class ValidationError extends CustomError {
  constructor (message: string) {
    const statusCode: number = 400

    super(message, statusCode)
  }
}

export class NotFoundError extends CustomError {
  constructor (message: string) {
    const statusCode: number = 404

    super(message, statusCode)
  }
}
