import cds from '@sap/cds';
import { expect } from 'chai';
// import axios from 'axios';

const test = cds.test(__dirname + "/../..");

// (test as any).defaults.auth=

describe('EmployeeService - Integration Tests', () => {
    // before(() => {
    //     axios.defaults.auth = { username: 'Rajarajan', password: '' };
    // });

    const { GET, POST, DELETE, axios } = test as any;
    axios.defaults.auth = { username: 'Rajarajan' };

    // Helper: creates a draft employee and activates it in one call.
    // Pass 'overrides' to replace specific fields, e.g. { firstName: 'John' }
    async function createEmployee(overrides: object = {}) {
        const res = await POST('/odata/v4/employee/Employees', {
            firstName: 'Test',
            lastName: 'User',
            address_street: '123 Test Street',
            address_city: 'Berlin',
            address_country_code: 'DE',
            bankInfo_name: 'Test Bank',
            bankInfo_accountNumber: `${Date.now().toString().padEnd(16, '0')}`,
            bankInfo_code: 'TB001',
            ...overrides
        });
        const ID = res.data.ID;
        const activated = await POST(
            `/odata/v4/employee/Employees(ID=${ID},IsActiveEntity=false)/draftActivate`,
            {}
        );
        return { ID, data: activated.data };
    }

    // Helper: find employee UUID by their employeeID business key
    async function getIDByEmployeeID(employeeID: string): Promise<string> {
        const res = await GET(
            `/odata/v4/employee/Employees?$filter=employeeID eq '${employeeID}'&$select=ID`
        );
        return res.data.value[0].ID;
    }

    //----------------generateEmployeeID-----------------
    describe('POST /Employees - generateEmployeeID', () => {

        it('should auto-generate employeeID as EMP006', async () => {
            const { data } = await createEmployee({
                firstName: 'John',
                lastName: 'Doe'
            });

            // 5 seed records in CSV + 1 new = EMP006
            expect(data.employeeID).to.equal('EMP006');
        });
    });

    //----------------generateEmailID-----------------
    describe('POST /Employees - generateEmailID', () => {

        it('should auto-generate email as firstname.lastname@test.com', async () => {
            const { data } = await createEmployee({
                firstName: 'Jane',
                lastName: 'Smith'
            });

            expect(data.emailID).to.equal('jane.smith@test.com');
        });

        it('should append count when duplicate name exists', async () => {
            // Create 1st employee 
            await createEmployee({ firstName: 'Michael', lastName: 'Scofield' });

            // Create 2nd employee with same name
            const { data } = await createEmployee({ firstName: 'Michael', lastName: 'Scofield' });

            expect(data.emailID).to.equal('michael.scofield1@test.com');
        });
    });

    //----------------validateBankAccountNumber-----------------
    describe('POST /Employees - validateBankAccountNum', () => {

        it('should reject when duplicate bank account number is used', async () => {
            const accountNumber = 'DUPL123456789012';

            // First employee — succeeds
            await createEmployee({ bankInfo_accountNumber: accountNumber });

            // Second employee — same account → should fail at draftActivate
            const res = await POST('/odata/v4/employee/Employees', {
                firstName: 'Bob',
                lastName: 'Jones',
                address_street: '1 Main St',
                address_city: 'Paris',
                address_country_code: 'DE',
                bankInfo_name: 'Test Bank',
                bankInfo_accountNumber: accountNumber,
                bankInfo_code: 'TB001'
            });
            const ID = res.data.ID;

            try {
                await POST(
                    `/odata/v4/employee/Employees(ID=${ID},IsActiveEntity=false)/draftActivate`,
                    {}
                );
                expect.fail('Should have thrown 400');
            } catch (err: any) {
                expect(err.response.status).to.equal(400);
                expect(err.response.data.error.message).to.equal(`Bank Account Number is already assigned to another Employee`);
            }
        });
    });

    // -----------------------deactivate action-----------------------
    describe('deactivate action', () => {

        it('should reject deactivating an already inactive employee', async () => {
            const ID = await getIDByEmployeeID('EMP004');

            try {
                await POST(
                    `/odata/v4/employee/Employees(ID=${ID},IsActiveEntity=true)/EmployeeService.deactivate`,
                    {}
                );
                expect.fail('Should have thrown 400');
            } catch (err: any) {
                expect(err.response.status).to.equal(400);
            }
        });

        it('should successfully deactivate an active employee', async () => {
            // EMP001 is Active
            const ID = await getIDByEmployeeID('EMP001');

            const res = await POST(
                `/odata/v4/employee/Employees(ID=${ID},IsActiveEntity=true)/EmployeeService.deactivate`,
                {}
            );
            expect(res.status).to.equal(204);
        });
    });


    //-----------------------Activate Action-------------------------- 
    describe('activate action', () => {

        it('should reject activating an already active employee', async () => {
            const ID = await getIDByEmployeeID('EMP003');

            try {
                await POST(
                    `/odata/v4/employee/Employees(ID=${ID},IsActiveEntity=true)/EmployeeService.activate`,
                    {}
                );
                expect.fail('Should have thrown 400');
            } catch (err: any) {
                expect(err.response.status).to.equal(400);
            }
        });

        it('should successfully activate an inactive employee', async () => {
            // This employee will be in Inactive status
            const ID = await getIDByEmployeeID('EMP001');

            const res = await POST(
                `/odata/v4/employee/Employees(ID=${ID},IsActiveEntity=true)/EmployeeService.activate`,
                {}
            );
            expect(res.status).to.equal(204);
        });
    });

    //-----------------------deleteEmployee-----------------------
    describe('DELETE /Employees', () => {

        it('should reject deleting an active employee', async () => {
            // EMP002 is Active
            const ID = await getIDByEmployeeID('EMP002');

            try {
                await DELETE(
                    `/odata/v4/employee/Employees(ID=${ID},IsActiveEntity=true)`
                );
                expect.fail('Should have thrown 400');
            } catch (err: any) {
                expect(err.response.status).to.equal(400);
            }
        });

        it('should allow deleting an inactive employee', async () => {
            // EMP004 is Inactive
            const ID = await getIDByEmployeeID('EMP004');

            const res = await DELETE(
                `/odata/v4/employee/Employees(ID=${ID},IsActiveEntity=true)`
            );
            expect(res.status).to.equal(204);
        });
    });

});