using EmployeeService as service from '../../srv/employee-service';
using from '../../db/schema';

annotate service.Employees with @(
    UI.FieldGroup #GeneratedGroup    : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: employeeID,
                Label: '{i18n>Id}',
            },
            {
                $Type: 'UI.DataField',
                Value: firstName,
            },
            {
                $Type: 'UI.DataField',
                Value: lastName,
            },
            {
                $Type: 'UI.DataField',
                Value: name,
                Label: '{i18n>Name}',
            },
            {
                $Type: 'UI.DataField',
                Value: status_code,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>EmailId}',
                Value: emailID,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>PhoneNumber}',
                Value: phoneNumber,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>AnnualLeavesGranted}',
                Value: annualLeavesGranted,
            },
            {
                $Type: 'UI.DataField',
                Label: '{i18n>AnnualLeavesUsed}',
                Value: annualLeavesUsed,
            },
            {
                $Type: 'UI.DataField',
                Value: annualleavesremaining,
                Label: '{i18n>AnnualLeavesRemaining}',
            },
        ],
    },
    UI.Facets                        : [
        {
            $Type : 'UI.CollectionFacet',
            Label : '{i18n>Overview}',
            ID    : 'Overview',
            Facets: [
                {
                    $Type : 'UI.ReferenceFacet',
                    ID    : 'GeneratedFacet1',
                    Label : 'General Information',
                    Target: '@UI.FieldGroup#GeneratedGroup',
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : 'Address Details',
                    ID    : 'AddressDetails',
                    Target: '@UI.FieldGroup#AddressDetails',
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : '{i18n>BankDetails}',
                    ID    : 'BankDetails',
                    Target: '@UI.FieldGroup#BankDetails1',
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : '{i18n>AdministrativeData}',
                    ID    : 'AdministrativeData',
                    Target: '@UI.FieldGroup#AdministrativeData',
                },
            ],
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>Learnings}',
            ID    : 'i18nLearnings',
            Target: 'learnings/@UI.LineItem#i18nLearnings',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Projects',
            ID    : 'Projects',
            Target: 'projects/@UI.LineItem#Projects',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Ratings',
            ID    : 'Ratings',
            Target: 'ratings/@UI.LineItem#Ratings',
        },
    ],
    UI.LineItem                      : [
        {
            $Type: 'UI.DataField',
            Value: employeeID,
            Label: '{i18n>Id}',
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>FirstName}',
            Value: firstName,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>LastName}',
            Value: lastName,
        },
        {
            $Type: 'UI.DataField',
            Label: '{i18n>EmailId}',
            Value: emailID,
        },
        {
            $Type: 'UI.DataField',
            Value: status_code,
        },
        {
            $Type: 'UI.DataField',
            Value: createdAt,
        },
        {
            $Type: 'UI.DataField',
            Value: createdBy,
        },
    ],
    UI.SelectionFields               : [
        ID,
        firstName,
        lastName,
        emailID,
        status_code,
        ratings.rating,
        ratings.year,
        learnings.learning_ID,
        projects.project_ID,
    ],
    UI.HeaderInfo                    : {
        Title         : {
            $Type: 'UI.DataField',
            Value: name,
        },
        TypeName      : '{i18n>Employee}',
        TypeNamePlural: '{i18n>Employees}',
        Description   : {
            $Type: 'UI.DataField',
            Value: name,
        },
        TypeImageUrl  : 'sap-icon://employee',
    },
    UI.FieldGroup #BankDetails       : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: bankInfo.bankName,
                Label: 'Name',
            },
            {
                $Type: 'UI.DataField',
                Value: bankInfo.accountNumber,
                Label: '{i18n>AccountNumber}',
            },
            {
                $Type: 'UI.DataField',
                Value: bankInfo.bankCode,
                Label: '{i18n>BankCode}',
            },
        ],
    },
    Communication.Contact #contact   : {
        $Type: 'Communication.ContactType',
        fn   : phoneNumber,
    },
    UI.FieldGroup #AddressDetails    : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: address_street,
                Label: '{i18n>Street}',
            },
            {
                $Type: 'UI.DataField',
                Value: address_city,
                Label: '{i18n>City}',
            },
            {
                $Type: 'UI.DataField',
                Value: address_country_code,
                Label: '{i18n>Country1}',
            },
        ],
    },
    UI.FieldGroup #Ratings           : {
        $Type: 'UI.FieldGroupType',
        Data : [],
    },
    UI.FieldGroup #Ratings1          : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: ratings.rating,
            },
            {
                $Type: 'UI.DataField',
                Value: ratings.year,
            },
            {
                $Type: 'UI.DataField',
                Value: ratings.reviewer_ID,
                Label: '{i18n>Reviewer}',
            },
            {
                $Type: 'UI.DataField',
                Value: ratings.createdAt,
            },
            {
                $Type: 'UI.DataField',
                Value: ratings.createdBy,
            },
        ],
    },
    UI.FieldGroup #AdministrativeData: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: createdAt,
            },
            {
                $Type: 'UI.DataField',
                Value: createdBy,
            },
            {
                $Type: 'UI.DataField',
                Value: modifiedAt,
            },
            {
                $Type: 'UI.DataField',
                Value: modifiedBy,
            },
        ],
    },
    UI.FieldGroup #BankDetails1      : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: bankInfo_name,
                Label: '{i18n>BankName}',
            },
            {
                $Type: 'UI.DataField',
                Value: bankInfo_accountNumber,
                Label: '{i18n>AccountNumber}',
            },
            {
                $Type: 'UI.DataField',
                Value: bankInfo_code,
                Label: '{i18n>Code}',
            },
        ],
    },
    UI.Identification                : [
        {
            $Type     : 'UI.DataFieldForAction',
            Action    : 'EmployeeService.activate',
            Label     : '{i18n>Activate}',
            @UI.Hidden: (not $draft.IsActiveEntity)
        },
        {
            $Type     : 'UI.DataFieldForAction',
            Action    : 'EmployeeService.deactivate',
            Label     : '{i18n>Deactivate}',
            @UI.Hidden: (not $draft.IsActiveEntity)
        },
    ],
);

annotate service.Employees with {
    firstName @(
        Common.Label       : '{i18n>FirstName}',
        Common.FieldControl: #Mandatory,
    )
};

annotate service.Employees with {
    lastName @(
        Common.Label       : '{i18n>LastName}',
        Common.FieldControl: #Mandatory,
    )
};

annotate service.Employees with {
    status @(
        Common.Label                   : '{i18n>Status}',
        Common.ValueListWithFixedValues: true,
        Common.Text                    : status.name,
        Common.Text.@UI.TextArrangement: #TextOnly,
        Common.FieldControl            : #ReadOnly,
    )
};

annotate service.Employees with {
    ID @Common.Label: 'ID'
};

annotate service.Employees with {
    emailID @Common.Label: '{i18n>EmailId}'
};

annotate service.EmployeeStatus with {
    code @(
        Common.Text                    : name,
        Common.Text.@UI.TextArrangement: #TextOnly,
    )
};

annotate service.Learnings with @(UI.LineItem #i18nLearnings: [
    {
        $Type: 'UI.DataFieldWithUrl',
        Value: learning_ID,
        Label: '{i18n>Course}',
        Url  : '/learningsmaster/index.html#/LearningsMaster(ID={learning_ID},IsActiveEntity=true)',
    },
    {
        $Type: 'UI.DataField',
        Value: status_code,
        Label: '{i18n>Status}',
    },
    {
        $Type: 'UI.DataField',
        Value: createdAt,
    },
    {
        $Type: 'UI.DataField',
        Value: createdBy,
    },
]);

annotate service.Learnings with {
    status @(
        Common.ValueListWithFixedValues: true,
        Common.Text                    : status.name,
        Common.Text.@UI.TextArrangement: #TextOnly,
    )
};

annotate service.LearningStatus with {
    code @(
        Common.Text                    : name,
        Common.Text.@UI.TextArrangement: #TextOnly,
    )
};

annotate service.Projects with @(UI.LineItem #Projects: [
    {
        $Type: 'UI.DataFieldWithUrl',
        Value: project_ID,
        Label: '{i18n>Name}',
        Url  : '/projectsmaster/index.html#/ProjectsMaster(ID={project_ID},IsActiveEntity=true)',
    },
    {
        $Type: 'UI.DataField',
        Value: createdAt,
    },
    {
        $Type: 'UI.DataField',
        Value: createdBy,
    },
]);

annotate service.Ratings with {
    rating @Common.Label: '{i18n>Rating}'
};

annotate service.Ratings with {
    year @(
        Common.Label       : '{i18n>RatingYear}',
        Common.FieldControl: #Mandatory,
    )
};

annotate service.Ratings with @(
    UI.LineItem #Ratings: [
        {
            $Type : 'UI.DataFieldForAnnotation',
            Target: '@UI.DataPoint#rating',
        },
        {
            $Type: 'UI.DataField',
            Value: year,
            Label: '{i18n>Year}',
        },
        {
            $Type: 'UI.DataField',
            Value: modifiedAt,
            Label: '{i18n>ReviewedOn}',
        },
        {
            $Type: 'UI.DataField',
            Value: modifiedBy,
            Label: '{i18n>ReviewedBy}',
        },
    ],
    UI.DataPoint #rating: {
        Value        : rating,
        Visualization: #Rating,
        TargetValue  : 5,
    },
);

annotate service.Learnings with {
    learning @(
        Common.Text                    : {
            $value                : learning.courseDescription,
            ![@UI.TextArrangement]: #TextOnly,
        },
        Common.Label                   : '{i18n>Learnings}',
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'LearningsMaster',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: learning_ID,
                ValueListProperty: 'ID',
            }, ],
        },
        Common.ValueListWithFixedValues: false,
        Common.FieldControl            : #Mandatory,
    );
};

annotate service.Projects with {
    project @(
        Common.Text                    : project.name,
        Common.Text.@UI.TextArrangement: #TextOnly,
        Common.Label                   : '{i18n>Projects}',
        Common.ValueList               : {
            $Type         : 'Common.ValueListType',
            CollectionPath: 'ProjectsMaster',
            Parameters    : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: project_ID,
                ValueListProperty: 'ID',
            }, ],
        },
        Common.ValueListWithFixedValues: false,
        Common.FieldControl            : #Mandatory,
    )
};

annotate service.Ratings with {
    reviewer @(
        Common.Text                    : reviewer.name,
        Common.Text.@UI.TextArrangement: #TextOnly,
    )
};

annotate service.LearningsMaster with {
    ID @(
        Common.Text                    : courseDescription,
        Common.Text.@UI.TextArrangement: #TextOnly
    )
};

annotate service.ProjectsMaster with {
    ID @(
        Common.Text                    : name,
        Common.Text.@UI.TextArrangement: #TextOnly
    )
};


annotate service.Employees with {
    annualLeavesGranted @Common.FieldControl: #ReadOnly
};

annotate service.Employees : address.street with @Common.FieldControl: #Mandatory;

annotate service.Employees : address.city with @Common.FieldControl: #Mandatory;

annotate service.Employees : address.country.code with @Common.FieldControl: #Mandatory;

annotate service.Employees : bankInfo.accountNumber with @Common.FieldControl: #Mandatory;

annotate service.Employees : bankInfo.code with @Common.FieldControl: #Mandatory;

annotate service.Employees : bankInfo.name with @Common.FieldControl: #Mandatory;

annotate service.Employees with {
    annualleavesremaining @Common.FieldControl: #ReadOnly
};

annotate service.Employees with {
    name @Common.FieldControl: #ReadOnly
};
