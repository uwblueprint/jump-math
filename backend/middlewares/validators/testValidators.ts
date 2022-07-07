import { Request, Response, NextFunction } from "express";
import { getApiValidationError, validatePrimitive, validateQuestionsArray } from "./util";

export const createTestRequestDTOValidator = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (!validatePrimitive(req.body.name, "string")) {
        return res.status(400).send(getApiValidationError("name", "string"));
    }
    if (!validatePrimitive(req.body.duration, "integer")) {
        return res.status(400).send(getApiValidationError("duration", "integer"));
    }
    if (!validatePrimitive(req.body.admin, "string")) {
        return res.status(400).send(getApiValidationError("admin", "string"));
    }
    if (!validatePrimitive(req.body.grade, "integer") || !(req.body.grade < 1 || req.body.grade > 12)) {
        return res.status(400).send(getApiValidationError("grade", "integer"));
    }
    if(!validateQuestionsArray(req.body.questions)){
        return res.status(400).send(getApiValidationError("questions", "Question"));
    }
    if (!validatePrimitive(req.body.password, "string")) {
        return res.status(400).send(getApiValidationError("password", "string"));
    }

    return next();
};