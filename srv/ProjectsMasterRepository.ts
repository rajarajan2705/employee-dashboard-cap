import cds from "@sap/cds";

export class ProjectsMasterRepository {
    async findEmployeesassignedtoProject(project_ID: String): Promise<any[]> {
        
        return await cds.run(
            SELECT.from("EmployeeService.Projects")
            .where({ project_ID })
        );
    };
}

export const projectsMasterRepository = new ProjectsMasterRepository();