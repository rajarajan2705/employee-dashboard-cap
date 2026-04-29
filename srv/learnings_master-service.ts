import cds from '@sap/cds'
import { LearningsMaster } from '#cds-models/LearningsService'

export class LearningsService extends cds.ApplicationService { 
  async init(): Promise<any> {

  this.before (['CREATE', 'UPDATE'], LearningsMaster, async (req) => {
    console.log('Before CREATE/UPDATE LearningsMaster', req.data)
  })
  this.after ('READ', LearningsMaster, async (learningsMaster, req) => {
    console.log('After READ LearningsMaster', learningsMaster)
  })
  this.before('DELETE', LearningsMaster, this.checkEmployeesAssigned.bind(this))

  return super.init()
}

async checkEmployeesAssigned(req:any): Promise<void> {
  const { ID } = req.params[0];
  
  const EmployeesAssignedQuery = SELECT.from("EmployeeService.Learnings")
                                 .where({ learning_ID: ID  });

  const result = await cds.run(EmployeesAssignedQuery);

  if (result.length > 0) {
    req.reject(400, `This course cannot be deleted as it has been assigned to Employees`);
  }
}
}

