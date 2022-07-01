import { Request, Response, NextFunction } from "express";
import {
  getApiValidationError,
  validateDate,
  validateResultsArray,
  validatePrimitive,
} from "./util";

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable-next-line import/prefer-default-export */
export const testSessionRequestDtoValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;
  if (!validatePrimitive(body.test, "string")) {
    return res.status(400).send(getApiValidationError("test", "string"));
  }
  if (!validatePrimitive(body.teacher, "string")) {
    return res.status(400).send(getApiValidationError("teacher", "string"));
  }
  if (!validatePrimitive(body.school, "string")) {
    return res.status(400).send(getApiValidationError("school", "string"));
  }
  if (!validatePrimitive(body.grade_level, "integer")) {
    return res
      .status(400)
      .send(getApiValidationError("grade_level", "integer"));
  }
  if (!validateResultsArray(body.results)) {
    return res
      .status(400)
      .send(getApiValidationError("results", "Result", true));
  }
  if (!validatePrimitive(body.access_code, "string")) {
    return res.status(400).send(getApiValidationError("access_code", "string"));
  }
  if (!validateDate(body.start_time)) {
    return res.status(400).send(getApiValidationError("start_time", "date"));
  }
  return next();
};
