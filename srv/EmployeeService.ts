import cds from '@sap/cds'
import { 
  Employees,
  Learnings,
  LearningsMaster,
  Projects,
  ProjectsMaster,
  Countries,
  // AvailabilityStatu,
  // AvailabilityStatus
 } from '#cds-models/EmployeeService'

 import { AVAILABILITY_STATUS, 
          LEARNING_STATUS,
          EMPLOYEE_STATUS 
        } from './common';
 import { employeeRepository } from './EmployeeRepository';       

class EmployeeService extends cds.ApplicationService { 
  async init(): Promise<any> {
    this.before('CREATE', Employees, this.generateEmployeeID.bind(this));
    this.before('CREATE', Employees, this.validateBankAccountNum.bind(this));
    this.before('CREATE', Employees, this.generateEmailID.bind(this));
    this.before('CREATE', Employees, this.assignInitialLearnings.bind(this));
    this.before('DELETE', Employees, this.deleteEmployee.bind(this));
    this.on("activate",   this.setToActive.bind(this));
    this.on("deactivate", this.setToInactive.bind(this));
    
    return super.init();
  }
  
  async generateEmployeeID (req:any): Promise<void> {
  //  const existingEmpCountQuery = SELECT
  //                                .one
  //                                .from("EmployeeService.Employees")
  //                                .columns('count(*) as count');
   
  //  const result = await cds.run(existingEmpCountQuery);
   
  const employeeCount = await employeeRepository.getEmployeeCount();
  const nextID = Number(employeeCount) + 1;
  const nextIDFormatted = String(nextID).padStart(3, '0');
   
   req.data.employeeID = `EMP${nextIDFormatted}`;
  }

  async generateEmailID(req: any): Promise<void> {
    const { firstName, lastName } = req.data;

    const baseEmailID: string =
      `${firstName}.${lastName}@test.com`.toLowerCase();

    // const existingEmailQuery = SELECT.from("EmployeeService.Employees")
    //                        .where({
    //                         firstName: firstName,
    //                         lastName: lastName
    //                         });
                            
    // const result = await cds.run(existingEmailQuery);
    const result = await employeeRepository.findEmployeesByName(firstName, lastName);                          

    let emailID: string;
    if (result.length === 0) {
      emailID = baseEmailID;
    } else {
      emailID = `${firstName}.${lastName}${result.length}@test.com`
        .toLowerCase();
    }

    req.data.emailID = emailID;
  }

  async validateBankAccountNum(req: any): Promise<void> {
    const { bankInfo_accountNumber } = req.data;

    if (!bankInfo_accountNumber) return;

    // const existingBankAccountQuery = SELECT.one
    //                                  .from("EmployeeService.Employees")
    //                                  .where({bankInfo_accountNumber: bankInfo_accountNumber});
    
    // const result = await cds.run(existingBankAccountQuery);
    const result = await employeeRepository.findEmployeeByBankAccount(bankInfo_accountNumber);

    if (result) {
      return req.error(
        {
        code: 400,
        message: `Bank Account Number is already assigned to another Employee`,
        target: "bankInfo_accountNumber"          
        }
      );
    }
  }
  
  async assignInitialLearnings(req: any): Promise<void> {
    // const initialLearningsQuery = SELECT
    //                                .from("EmployeeService.LearningsMaster")
    //                                .where({availability_code: AVAILABILITY_STATUS.initial});
    
    // const initialLearnings = await cds.run(initialLearningsQuery);

    const initialLearnings = await employeeRepository.getInitialLearnings();
    
    req.data.learnings = initialLearnings.map((learning: any) => ({
      learning_ID: learning.ID,
      status_code: LEARNING_STATUS.open
    }));
  }

  async setToActive(req:any): Promise<void> {
    const { ID } = req.params[0];
    
    // const validateStatusquery = SELECT.one
    //                              .from("EmployeeService.Employees")
    //                              .where({ ID: ID });
    
    // const result = await cds.run(validateStatusquery);
    const result = await employeeRepository.findEmployeeByID(ID);
    
    if ( result.status_code === EMPLOYEE_STATUS.active ){
     return req.reject(400, 'Employee is already in Active status');
    }
    else{
    //  await UPDATE("EmployeeService.Employees")
    //        .set({ status_code: EMPLOYEE_STATUS.active} )
    //        .where({ ID: ID });
    await employeeRepository.updateEmployeeStatus(ID, EMPLOYEE_STATUS.active );

   return req.notify('Employee activated successfully!');
   }
  }

  async setToInactive(req:any): Promise<any> {
    const { ID } = req.params[0];

    // const validateStatusquery = SELECT.one
    //                              .from("EmployeeService.Employees")
    //                              .where({ ID: ID });
    
    // const result = await cds.run(validateStatusquery);
    const result = await employeeRepository.findEmployeeByID(ID);

    if ( result.status_code === EMPLOYEE_STATUS.inactive ){
     return req.reject(400, 'Employee is already in Inactive status');
    }
    else{
      // await UPDATE("EmployeeService.Employees")
      //       .set({ status_code: EMPLOYEE_STATUS.inactive })
      //       .where( { ID: ID } );

    await employeeRepository.updateEmployeeStatus(ID, EMPLOYEE_STATUS.inactive );
    return req.notify('Employee deactivated successfully!');
  } 
}

async deleteEmployee(req:any): Promise<any> {
  const { ID } = req.data;

  // const validateDeleteQuery = SELECT.one
  //                             .from("EmployeeService.Employees")
  //                             .where( { ID: ID });

  // const result = await cds.run(validateDeleteQuery);
  const result = await employeeRepository.findEmployeeByID(ID);

  if ( result.status_code !== EMPLOYEE_STATUS.inactive) {
    req.reject(400, 'Only Inactive Employees can be deleted');
  }                         
}

}

export default EmployeeService;