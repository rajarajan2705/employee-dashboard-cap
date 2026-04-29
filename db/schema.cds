namespace employee.dashboard;

using {
    cuid,
    managed,
    Country,
    sap.common.Countries,
    sap.common.CodeList
} from '../node_modules/@sap/cds/common';

entity Employees : cuid, managed {
    employeeID            : String(10) @readonly;
    firstName             : String             @mandatory;
    lastName              : String             @mandatory;
    name                  : String  = trim(firstName || ' ' || lastName);
    emailID               : EmailAddress;
    phoneNumber           : PhoneNumber;
    status                : Association to EmployeeStatus default 'A';
    address               : Address;
    bankInfo              : Bank;
    annualLeavesGranted   : Integer default 20 @readonly;
    annualLeavesUsed      : Integer;
    annualleavesremaining : Integer = (
        annualLeavesGranted - annualLeavesUsed
    );
    learnings             : Composition of many Learnings
                                on learnings.employee = $self;
    projects              : Composition of many Projects
                                on projects.employee = $self;
    ratings               : Composition of many Ratings
                                on ratings.employee = $self;

}

type EmailAddress : String;
type PhoneNumber  : String(20);

type Address {
    street  : String(100);
    city    : String(50);
    country : Association to Countries;
}

type Bank {
    name          : String(100);
    accountNumber : String(16);
    code          : String(8);
}

entity EmployeeStatus : CodeList {
    key code : String(1) enum {
            inactive = 'I';
            active = 'A';
        };
}

entity Ratings : cuid, managed {
    employee : Association to Employees;
    year     : Integer;
    rating   : Integer;
    reviewer : Association to Employees;
}

entity Learnings : cuid, managed {
    employee : Association to Employees;
    learning : Association to LearningsMaster @assert.target;
    status   : Association to LearningStatus default '01';
}

entity LearningStatus : CodeList {
    key code : String(2) enum {
            open = '01';
            inProgress = '03';
            completed = '05';
        };
}

entity Projects : cuid, managed {
    employee : Association to Employees;
    project  : Association to ProjectsMaster @assert.target;
}

entity ProjectsMaster : cuid, managed {
    name        : String @mandatory;
    description : String;
}

entity LearningsMaster : cuid, managed {
    courseDescription : String @mandatory;
    availability      : Association to AvailabilityStatus default '01';
    courseContacts    : String;
}

entity AvailabilityStatus : CodeList {
    key code : String(2) enum {
            initial = '01';
            available = '03';
            notAvailable = '05';
        };
}
