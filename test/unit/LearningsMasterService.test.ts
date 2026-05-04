import { expect } from "chai";
import sinon from 'sinon';
import { learningsMasterRepository } from "../../srv/LearningsMasterRepository";
import LearningsService from "../../srv/LearningsMasterService";

describe('LearningsMasterService - Unit Tests', () => {
    let service: LearningsService;

    beforeEach(() => {
        service = new LearningsService();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('deleteLearnings', () => {

        it('should reject deletion if course is assigned to any employee', async () => {
            sinon.stub(learningsMasterRepository, 'findEmployeesAssignedwithLearning').resolves([{ ID: 'learning-123', employee_ID: 'EMP001' }]);
            const req = {
                params: [{ ID: 'LM-123' }],
                reject: sinon.stub()
            };

            await service.checkEmployeesAssigned(req);

            expect(req.reject.calledWith(400, 'This course cannot be deleted as it has been assigned to Employees'));
        });

        it('should allow deletion if course is not assigned to any employee', async () => {
            sinon.stub(learningsMasterRepository, 'findEmployeesAssignedwithLearning').resolves([]);
            const req = {
                params: [{ ID: 'LM-567' }],
                reject: sinon.stub()
            };

            await service.checkEmployeesAssigned(req);

            expect(req.reject.called).to.be.false;
        });

    });

});