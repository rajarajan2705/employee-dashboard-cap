using employee.dashboard as db from '../db/schema';
using {sap.common} from '@sap/cds/common';

service ProjectsService {
    entity ProjectsMaster as projection on db.ProjectsMaster;
}

annotate ProjectsService.ProjectsMaster with @odata.draft.enabled;
