using EmployeeService as service from '../../srv/EmployeeService';
using from '../../db/schema';

annotate service.Employees with actions {
    activate   @(
        Core.OperationAvailable            : {$edmJson: {$Eq: [
            {$Path: 'status_code'},
            'I'
        ]}},
        Common.SideEffects.TargetProperties: ['status_code']
    );
    deactivate @(
        Core.OperationAvailable            : {$edmJson: {$Eq: [
            {$Path: 'status_code'},
            'A'
        ]}},
        Common.SideEffects.TargetProperties: ['status_code']
    );
};
