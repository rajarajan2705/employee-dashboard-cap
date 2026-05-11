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
  entity Ratings         as projection on db.Ratings;
  entity LearningsMaster as projection on db.LearningsMaster;
  entity ProjectsMaster  as projection on db.ProjectsMaster;
  entity Countries       as projection on common.Countries;


}

annotate EmployeeService.Employees with @odata.draft.enabled;

annotate EmployeeService with @requires: [
  'HR_Admin',
  'HR_Audit'
];

annotate EmployeeService.Employees with @(restrict: [
  {
    grant: 'READ',
    to   : 'HR_Audit'
  },
  {
    grant: [
      'READ',
      'CREATE',
      'UPDATE',
      'DELETE',
      'activate',
      'deactivate'
    ],
    to   : 'HR_Admin'
  }
]);
