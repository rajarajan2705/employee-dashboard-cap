import cds from "@sap/cds";
import { AVAILABILITY_STATUS } from "./common";

export class EmployeeRepository {
    async getEmployeeCount(): Promise<Number> {
        const result = await cds.run(
            SELECT.one
                .from("EmployeeService.Employees")
                .columns('count(*) as count')
        );
        return Number(result.count);
    }

    async findEmployeesByName(firstName: String, lastName: String): Promise<any[]> {
        return await cds.run(
            SELECT.from("EmployeeService.Employees")
                .where({ firstName, lastName })
        );
    }

    async findEmployeeByBankAccount(accountNumber: string): Promise<any> {
        return await cds.run(
            SELECT.one
                .from("EmployeeService.Employees")
                .where({ bankInfo_accountNumber: accountNumber })
        );
    }

    async getInitialLearnings(): Promise<any[]> {
        return await cds.run(
            SELECT.from("EmployeeService.LearningsMaster")
                .where({ availability_code: AVAILABILITY_STATUS.initial })
        );
    }

    async findEmployeeByID(ID: string): Promise<any> {
        return await cds.run(
            SELECT.one
                .from("EmployeeService.Employees")
                .where({ ID })
        );
    }

    async updateEmployeeStatus(ID: string, status_code: string): Promise<void> {
        await cds.run(
            UPDATE("EmployeeService.Employees")
                .set({ status_code })
                .where({ ID })
        );
    }

}

export const employeeRepository = new EmployeeRepository();