using employee.dashboard as db from '../db/schema';
using {sap.common} from '@sap/cds/common';

service LearningsService {
    entity LearningsMaster as projection on db.LearningsMaster;
}

annotate LearningsService.LearningsMaster with @odata.draft.enabled;
