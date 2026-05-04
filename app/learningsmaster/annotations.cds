using LearningsService as service from '../../srv/LearningsMasterService';
using from '../../db/schema';

annotate service.LearningsMaster with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : '{i18n>CourseDescription}',
                Value : courseDescription,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Availability}',
                Value : availability_code,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>CourseContacts}',
                Value : courseContacts,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.CollectionFacet',
            Label : '{i18n>Overview}',
            ID : 'i18nOverview',
            Facets : [
                {
                    $Type : 'UI.ReferenceFacet',
                    ID : 'GeneratedFacet1',
                    Label : '{i18n>GeneralInformation}',
                    Target : '@UI.FieldGroup#GeneratedGroup',
                },
                {
                    $Type : 'UI.ReferenceFacet',
                    Label : '{i18n>AdministrativeData}',
                    ID : 'i18nAdministrativeData',
                    Target : '@UI.FieldGroup#i18nAdministrativeData',
                },
            ],
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : '{i18n>CourseDescription}',
            Value : courseDescription,
        },
        {
            $Type : 'UI.DataField',
            Value : availability_code,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>CourseContacts}',
            Value : courseContacts,
        },
        {
            $Type : 'UI.DataField',
            Value : modifiedAt,
        },
        {
            $Type : 'UI.DataField',
            Value : modifiedBy,
        },
    ],
    UI.SelectionFields : [
        courseDescription,
        availability_code,
    ],
    UI.HeaderInfo : {
        TypeName : '{i18n>Learning}',
        TypeNamePlural : '{i18n>Learnings}',
        Title : {
            $Type : 'UI.DataField',
            Value : courseDescription,
        },
        TypeImageUrl : 'sap-icon://education',
    },
    UI.FieldGroup #i18nAdministrativeData : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : createdAt,
            },
            {
                $Type : 'UI.DataField',
                Value : createdBy,
            },
            {
                $Type : 'UI.DataField',
                Value : modifiedAt,
            },
            {
                $Type : 'UI.DataField',
                Value : modifiedBy,
            },
        ],
    },
);

annotate service.LearningsMaster with {
    courseDescription @(
        Common.Label : '{i18n>CourseDescription}',
        Common.FieldControl : #Mandatory,
    )
};

annotate service.LearningsMaster with {
    availability @(
        Common.Label : '{i18n>Availability}',
        Common.ValueListWithFixedValues : true,
        Common.Text : availability.name,
        Common.Text.@UI.TextArrangement : #TextOnly,
        Common.FieldControl : #Mandatory,
    )
};

annotate service.AvailabilityStatus with {
    code @(
        Common.Text : name,
        Common.Text.@UI.TextArrangement : #TextOnly,
    )
};

