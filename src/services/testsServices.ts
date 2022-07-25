import {Tests} from "@prisma/client"

import * as authentication from "../utils/authenticationUtils.js"
import * as repositories from "../repositories/testsRepositories.js"

export type CreateTestsData = Omit<Tests, "id">;

export async function create (test: CreateTestsData, token: string) {
    await authentication.verifyToken(token);

    const checkTeacherDisciplined = await repositories.findByTeacherId(test.teacherDisciplinedId);
    if (!checkTeacherDisciplined) { throw { type: "no_content"} };

    const checkCategories = await repositories.findByCategoriesId(test.categoriesId);
    if (!checkCategories) { throw { type: "no_content"} };

    const create = await repositories.create(test);
    return {... create};
};

export async function viewsByDisciplines (token: string) {
    await authentication.verifyToken(token);

    const viewsByDisciplines = await repositories.getAllDisciplines();

    return viewsByDisciplines
}

export async function viewsByTeachers (token: string) {

}