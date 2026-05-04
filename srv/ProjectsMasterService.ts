import cds from '@sap/cds'
import { ProjectsMaster } from '#cds-models/ProjectsService'
import { employeeRepository } from './EmployeeRepository';
import { projectsMasterRepository } from './ProjectsMasterRepository';

export class ProjectsService extends cds.ApplicationService {
  async init(): Promise<any> {

    this.before('DELETE', ProjectsMaster, this.checkEmployeesAssigned.bind(this))

    return super.init()
  }

  async checkEmployeesAssigned(req: any): Promise<void> {
    const { ID } = req.params[0];

    // const EmployeesAssignedQuery = SELECT.from("EmployeeService.Projects")
    //   .where({ project_ID: ID });

    // const result = await cds.run(EmployeesAssignedQuery);
    const result = await projectsMasterRepository.findEmployeesassignedtoProject(ID);

    if (result.length > 0) {
      req.reject(400, `This project cannot be deleted as Employee(s) are assigned to it`);
    }
  }

}
