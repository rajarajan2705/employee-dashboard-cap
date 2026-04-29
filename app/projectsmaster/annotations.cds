using ProjectsService as service from '../../srv/projects_master-service';
annotate service.ProjectsMaster with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Name}',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Description}',
                Value : description,
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
                    Label : 'Administrative Data',
                    ID : 'AdministrativeData',
                    Target : '@UI.FieldGroup#AdministrativeData',
                },
            ],
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : '{i18n>Name}',
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>Description}',
            Value : description,
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
        name,
        description,
    ],
    UI.HeaderInfo : {
        TypeName : '{i18n>Project}',
        TypeNamePlural : '{i18n>Projects}',
        Title : {
            $Type : 'UI.DataField',
            Value : name,
        },
        TypeImageUrl : 'sap-icon://activity-assigned-to-goal',
    },
    UI.FieldGroup #AdministrativeData : {
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

annotate service.ProjectsMaster with {
    name @(
        Common.Label : '{i18n>Name}',
        Common.FieldControl : #Mandatory,
    )
};

annotate service.ProjectsMaster with {
    description @Common.Label : '{i18n>Description}'
};

