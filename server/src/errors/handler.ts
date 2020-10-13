/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (
  error,
  request,
  response,
  _,
) => {
  console.error(error);

  return response.status(500).json({ message: 'Internal Server Error' });
};
