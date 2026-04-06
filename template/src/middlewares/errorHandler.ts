import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export interface AppError extends Error {
  statusCode?: number;
}

export const notFound = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const error: AppError = new Error(`Not Found — ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void => {
  const statusCode = err.statusCode ?? 500;
  logger.error(err.message, err);

  res.status(statusCode).json({
    success: false,
    message: err.message ?? "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
