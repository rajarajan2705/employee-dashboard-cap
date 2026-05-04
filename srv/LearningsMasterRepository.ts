import cds from "@sap/cds";

export class LearningsMasterRepository {

    async findEmployeesAssignedwithLearning(learning_ID: String): Promise<any[]> {

        return await cds.run(
            SELECT.from("EmployeeService.Learnings")
                .where({ learning_ID })
        );
    };
}

export const learningsMasterRepository = new LearningsMasterRepository();