/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string[];
}

export const errorHandler: ErrorRequestHandler = (
  error,
  request,
  response,
  _,
) => {
  if (error instanceof ValidationError) {
    const errors: ValidationErrors = {};

    error.inner.forEach(err => {
      errors[err.path] = err.errors;
    });

    return response.status(400).json({ message: 'ValidationFails', errors });
  }
  console.error(error);

  return response.status(500).json({ message: 'Internal Server Error' });
};
