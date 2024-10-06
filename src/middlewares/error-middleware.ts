import { NextFunction, Request, Response } from "express"
import ApiError from "../exceptions/api-error"

export default function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("error", err)
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors })
  }
  const error = ApiError.ServerError()
  return res
    .status(error.status)
    .json({ message: error.message, errors: error.errors })
}
