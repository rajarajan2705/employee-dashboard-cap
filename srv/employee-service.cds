using employee.dashboard as db from '../db/schema';
using {sap.common} from '@sap/cds/common';

service EmployeeService {
  entity Employees       as projection on db.Employees
    actions {
      action activate();
      action deactivate();
    }

  entity Learnings       as projection on db.Learnings;
  entity Projects        as projection on db.Projects;
  entity LearningsMaster as projection on db.LearningsMaster;
  entity ProjectsMaster  as projection on db.ProjectsMaster;
  entity Countries       as projection on common.Countries;


}

annotate EmployeeService.Employees with @odata.draft.enabled;
