import { prisma } from "../config/database.js";
import { CreateTestsData } from "../services/testsServices.js";

export async function findByTeacherId (teacherDisciplinedId: number) {
    return prisma.teacherDisciplines.findUnique({
        where: {
            id: teacherDisciplinedId
        }
    })
}

export async function findByCategoriesId (categoriesId: number) {
    return prisma.categories.findUnique({
        where: {
            id: categoriesId
        }
    })
}

export async function getAllDisciplines () {
    return prisma.terms.findMany({
        include: {
            disciplines: {
                include: {
                    teachersDisciplines: {
                        include: {
                            teachers: true,
                            tests: {
                                include: {
                                    categories: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
}

export async function create ({name, pdfUrl, categoriesId, teacherDisciplinedId}: CreateTestsData) {
    return prisma.tests.create({
        data: {
            name,
            pdfUrl,
            categoriesId,
            teacherDisciplinedId
        }
    })
}