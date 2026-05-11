import cds from '@sap/cds';
import { expect } from 'chai';

const test = cds.test('.');

describe('ProjectsMasterService - Integration tests', () => {
    const { GET, POST, DELETE, axios } = test as any;
    axios.defaults.auth = { username: 'TEST_USER_PM' };

    // Find ProjectsMaster ID by name
    async function getProjectIDByName(name: string): Promise<string> {
        const res = await GET(
            `/odata/v4/projects/ProjectsMaster?$filter=name eq '${name}'&$select=ID`
        );
        return res.data.value[0].ID;
    }

    describe('DELETE /Projects', () => {

        it('should reject deletion when project is assigned to employees', async () => {
            const ID = await getProjectIDByName('S/4HANA Rollout');
            try {
                await DELETE(`/odata/v4/projects/ProjectsMaster(ID=${ID},IsActiveEntity=true)`);
                expect.fail('Should have thrown 400');
            } catch (err: any) {
                expect(err.response.status).to.equal(400);
            }
        });

        it('should allow deletion when project has no employee assignments', async () => {
            const ID = await getProjectIDByName('Test Automation Framework');
            const res = await DELETE(`/odata/v4/projects/ProjectsMaster(ID=${ID},IsActiveEntity=true)`);
            expect(res.status).to.equal(204);
        });
    });
});