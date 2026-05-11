import { expect } from "chai";
import sinon from 'sinon';
import { employeeRepository } from "../../srv/EmployeeRepository";
import EmployeeService from "../../srv/EmployeeService";
import { EMPLOYEE_STATUS, LEARNING_STATUS } from "../../srv/common";
// import { afterEach, beforeEach, describe } from "node:test";

describe('EmployeeService - Unit Tests', () => {
    let service: EmployeeService;

    beforeEach(() => {
        service = new EmployeeService();
    });

    afterEach(() => {
        sinon.restore();
    });

    // ----------generateEmployeeID---------   
    describe('generateEmployeeID', () => {
        it('should generate EMP001 when no employees exist', async () => {
            sinon.stub(employeeRepository, 'getEmployeeCount').resolves(0);
            const req = { data: {} as any };

            await service.generateEmployeeID(req);

            expect(req.data.employeeID).to.equal('EMP001');
        });

        it('should generate EMP010 when emploees exist count is 9', async () => {
            sinon.stub(employeeRepository, 'getEmployeeCount').resolves(9);
            const req = { data: {} as any };

            await service.generateEmployeeID(req);

            expect(req.data.employeeID).to.equal('EMP010');
        });

        it('should pad the ID to 3 digits', async () => {
            sinon.stub(employeeRepository, 'getEmployeeCount').resolves(4);
            const req = { data: {} as any };

            await service.generateEmployeeID(req);

            expect(req.data.employeeID).to.equal('EMP005');
        });

    });

    // ---------------validateBankAccountNumber------------------
    describe('validateBankAccountNum', () => {

        it('should call req.error when bank account number already exists for another employee', async () => {
            sinon.stub(employeeRepository, 'findEmployeeByBankAccount').resolves({ ID: 'other-emp' });
            const req = {
                data: { ID: 'current-emp', bankInfo_accountNumber: '123456789012' },
                error: sinon.stub()
            };

            await service.validateBankAccountNum(req);

            expect(req.error.calledOnce).to.be.true;
            expect(req.error.firstCall.args[0].code).to.equal(400);
            expect(req.error.firstCall.args[0].message).to.equal(`Bank Account Number is already assigned to another Employee`);

        });

        it('should NOT call req.error when bank account is unique', async () => {
            sinon.stub(employeeRepository, 'findEmployeeByBankAccount').resolves(null);
            const req = {
                data: { ID: 'current-emp', bankInfo_accountNumber: '199019911992' },
                error: sinon.stub()
            };

            await service.validateBankAccountNum(req);

            expect(req.error.called).to.be.false;
        });

        it('should return early and skip DB call when no account number provided', async () => {
            const repoStub = sinon.stub(employeeRepository, 'findEmployeeByBankAccount');
            const req = { data: { ID: 'current-emp' }, error: sinon.stub() };

            await service.validateBankAccountNum(req);

            expect(repoStub.called).to.be.false;
        });

    });
    // --------------generateEmailID---------------
    describe('generateEmailID', () => {

        it('should generate base emailID when no duplicate names exist', async () => {
            sinon.stub(employeeRepository, 'findEmployeesByName').resolves([]);
            const req = { data: { firstName: 'Michael', lastName: 'Scofield' } as any };

            await service.generateEmailID(req);

            expect(req.data.emailID).to.equal('michael.scofield@test.com');
        });

        it('should append count to email when duplicate name exists', async () => {
            sinon.stub(employeeRepository, 'findEmployeesByName').resolves(
                [{ ID: 'test1', firstName: 'Hans', lastName: 'Zimmer' },
                { ID: 'test11', firstName: 'Hans', lastName: 'Zimmer' }
                ]);
            const req = { data: { firstName: 'Hans', lastName: 'Zimmer' } as any };

            await service.generateEmailID(req);

            expect(req.data.emailID).to.equal('hans.zimmer2@test.com');
        });

    });

    // -----------------assignInitialLearnings--------------------------------
    describe('assignInitialLearnings', () => {

        it('should map initial learnings when creating new employee', async () => {
            sinon.stub(employeeRepository, 'getInitialLearnings').resolves(
                [{ ID: 'learning-1' },
                { ID: 'learning-2' }
                ]);

            const req = { data: {} as any };

            await service.assignInitialLearnings(req);

            expect(req.data.learnings[0]).to.deep.equal({ learning_ID: 'learning-1', status_code: LEARNING_STATUS.open });
            expect(req.data.learnings[1]).to.deep.equal({ learning_ID: 'learning-2', status_code: LEARNING_STATUS.open });
        });

        it('should assign empty learnings array when no initial learnings exist', async () => {
            sinon.stub(employeeRepository, 'getInitialLearnings').resolves([]);
            const req = { data: {} as any };

            await service.assignInitialLearnings(req);

            expect(req.data.learnings).to.deep.equal([]);
        });
    });

    //-----------------setToActive-------------------------
    describe('setToActive', () => {

        it('should reject if employee is already active', async () => {
            sinon.stub(employeeRepository, 'findEmployeeByID').resolves({ ID: 'emp-123', status_code: EMPLOYEE_STATUS.active });
            const req = {
                params: [{ ID: 'emp-123' }],
                reject: sinon.stub(),
                notify: sinon.stub()
            };

            await service.setToActive(req);

            expect(req.reject.calledWith(400, 'Employee is already in Active status')).to.be.true;
            expect(req.notify.called).to.be.false;
        });

        it('should update status to active and notify when employee is inactive', async () => {
            sinon.stub(employeeRepository, 'findEmployeeByID').resolves({ ID: 'emp-123', status_code: EMPLOYEE_STATUS.inactive });
            const updateStub = sinon.stub(employeeRepository, 'updateEmployeeStatus').resolves();
            const req = {
                params: [{ ID: 'emp-123' }],
                reject: sinon.stub(),
                notify: sinon.stub()
            };

            await service.setToActive(req);

            expect(updateStub.calledWith('emp-123', EMPLOYEE_STATUS.active)).to.be.true;
            expect(req.notify.calledWith('Employee activated successfully!')).to.be.true;
        });

    });

    describe('setToInactive', () => {
        it('should reject if employee is already inactive', async () => {
            sinon.stub(employeeRepository, 'findEmployeeByID').resolves({ status_code: EMPLOYEE_STATUS.inactive });
            const req = {
                params: [{ ID: 'emp-123' }],
                reject: sinon.stub(),
                notify: sinon.stub()
            };

            await service.setToInactive(req);

            expect(req.reject.calledWith(400, 'Employee is already in Inactive status')).to.be.true;
            expect(req.notify.called).to.be.false;
        });

        it('should update status to Inactive and notify when employee is active', async () => {
            sinon.stub(employeeRepository, 'findEmployeeByID').resolves({ status_code: EMPLOYEE_STATUS.active });
            const updateStub = sinon.stub(employeeRepository, 'updateEmployeeStatus').resolves();
            const req = {
                params: [{ ID: 'emp-123' }],
                reject: sinon.stub(),
                notify: sinon.stub()
            };

            await service.setToInactive(req);

            expect(req.notify.calledWith('Employee deactivated successfully!')).to.be.true;
            expect(updateStub.calledWith('emp-123')).to.be.true;
        });
    });

    // -----------------------deleteEmployee------------------------
    describe('deleteEmployee', () => {

        it('should reject deletion if employee is active', async () => {
            sinon.stub(employeeRepository, 'findEmployeeByID').resolves({ ID: 'emp-123', status_code: EMPLOYEE_STATUS.active });
            const req = {
                data: { ID: 'emp-123' },
                reject: sinon.stub()
            };

            await service.deleteEmployee(req);

            expect(req.reject.calledWith(400, 'Only Inactive Employees can be deleted'));
        });

        it('should allow deletion if employee is inactive', async () => {
            sinon.stub(employeeRepository, 'findEmployeeByID').resolves({ status_code: EMPLOYEE_STATUS.inactive });
            const req = {
                data: { ID: 'emp-123' },
                reject: sinon.stub()
            };

            await service.deleteEmployee(req);

            expect(req.reject.called).to.be.false;
        });
    });

});