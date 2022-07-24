import { Request, Response } from "express";

import * as services from "../services/testsServices.js"

export async function create (req: Request, res: Response) {
    const token = req.headers["token"] as string
    if(!token) { throw { type: "not_found" } };

    const test: services.CreateTestsData = req.body;
    if(!test.name || !test.pdfUrl || !test.categoriesId || !test.teacherDisciplinedId) {
        throw { type: "not_found" } ;
    };
    if(typeof(test.categoriesId) !== "number" || typeof(test.teacherDisciplinedId) !== "number") {
        throw { type: "not_found" };
    }

    const create = await services.create(test, token);

    return res.status(201).send(create);
}