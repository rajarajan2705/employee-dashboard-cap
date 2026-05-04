import cds from '@sap/cds'
import { LearningsMaster } from '#cds-models/LearningsService'
import { learningsMasterRepository } from './LearningsMasterRepository';

export class LearningsService extends cds.ApplicationService {
  async init(): Promise<any> {

    this.before('DELETE', LearningsMaster, this.checkEmployeesAssigned.bind(this))

    return super.init()
  }

  async checkEmployeesAssigned(req: any): Promise<void> {
    const { ID } = req.params[0];

    // const EmployeesAssignedQuery = SELECT.from("EmployeeService.Learnings")
    //   .where({ learning_ID: ID });

    // const result = await cds.run(EmployeesAssignedQuery);
    const result = await learningsMasterRepository.findEmployeesAssignedwithLearning(ID);

    if (result.length > 0) {
      req.reject(400, `This course cannot be deleted as it has been assigned to Employees`);
    }
  }
}

export default LearningsService;