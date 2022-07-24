import Joi from "joi";

import { CreateTestsData } from "../services/testsServices";

const testsCreatedSchema = Joi.object<CreateTestsData>({
    name: Joi.string().required(),
    pdfUrl: Joi.string().uri().required(),
    categoriesId: Joi.number().required(),
    teacherDisciplinedId: Joi.number().required()
});

export {
    testsCreatedSchema
}