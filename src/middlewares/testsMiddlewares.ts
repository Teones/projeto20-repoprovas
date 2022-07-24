import { NextFunction, Request, Response } from "express";

import * as testsSchema from "../schemas/testsCreatedSchema.js";

export function validateSignUp (req: Request, res: Response, next: NextFunction) {
    const test = req.body;
    const {error} = testsSchema.testsCreatedSchema.validate(test, {abortEarly: false});
    if(error) {
        return res.status(422).send(error.details.map(detail => detail.message));
    };

    next();
};