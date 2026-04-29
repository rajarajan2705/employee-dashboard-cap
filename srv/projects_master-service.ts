import cds from '@sap/cds'
import { ProjectsMaster } from '#cds-models/ProjectsService'

export class ProjectsService extends cds.ApplicationService { 
  async init(): Promise<any> {

  this.before (['CREATE', 'UPDATE'], ProjectsMaster, async (req) => {
    console.log('Before CREATE/UPDATE ProjectsMaster', req.data)
  })
  this.after ('READ', ProjectsMaster, async (projectsMaster, req) => {
    console.log('After READ ProjectsMaster', projectsMaster)
  })
  
  this.before('DELETE', ProjectsMaster, this.checkEmployeesAssigned.bind(this))

  return super.init()
}

async checkEmployeesAssigned(req:any): Promise<void> {
  const { ID } = req.params[0];
  
  const EmployeesAssignedQuery = SELECT.from("EmployeeService.Projects")
                                 .where({ project_ID: ID  });

  const result = await cds.run(EmployeesAssignedQuery);

  if (result.length > 0) {
    req.reject(400, `This project cannot be deleted as Employee(s) are assigned to it`);
  }
}

}
