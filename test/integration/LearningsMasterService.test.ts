import cds from '@sap/cds';
import { expect } from 'chai';

const test = cds.test('.');

describe('LearningsMasterService - Integration Tests', () => {
    const { GET, POST, DELETE, axios } = test as any;
    axios.defaults.auth = { username: 'TEST_USER_LM' };

    // Find LearningsMaster ID by courseDescription
    async function getLearningIDByDescription(description: string): Promise<string> {
        const res = await GET(
            `/odata/v4/learnings/LearningsMaster?$filter=courseDescription eq '${description}'&$select=ID`
        );
        return res.data.value[0].ID;
    }

    describe('DELETE /Learnings', () => {

        it('should reject deletion when course is assigned to employees', async () => {
            const ID = await getLearningIDByDescription('SAP CAPM Foundations');
            try {
                await DELETE(`/odata/v4/learnings/LearningsMaster(ID=${ID},IsActiveEntity=true)`);
                expect.fail('Should have thrown 400');
            } catch (err: any) {
                expect(err.response.status).to.equal(400);
            }
        });

        it('should allow deletion when course has no employee assignments', async () => {
            const ID = await getLearningIDByDescription('Advanced OData Modeling');
            const res = await DELETE(`/odata/v4/learnings/LearningsMaster(ID=${ID},IsActiveEntity=true)`);
            expect(res.status).to.equal(204);
        });
    });
});