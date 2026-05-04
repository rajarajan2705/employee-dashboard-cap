import { expect } from "chai";
import sinon from 'sinon';
import { projectsMasterRepository } from "../../srv/ProjectsMasterRepository";
import { ProjectsService } from "../../srv/ProjectsMasterService";

describe('ProjectsMasterService - Unit Tests', () => {
    let service: ProjectsService;

    beforeEach(() => {
        service = new ProjectsService();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('deleteProjects', () => {

        it('should reject deletion if any employee is assigned to the project', async () => {
            sinon.stub(projectsMasterRepository, 'findEmployeesassignedtoProject').resolves([{ ID: 'project-123', project_ID: 'EMP001' }]);
            const req = {
                params: [{ ID: 'PR-123' }],
                reject: sinon.stub()
            };

            await service.checkEmployeesAssigned(req);

            expect(req.reject.calledWith(400, 'This project cannot be deleted as Employee(s) are assigned to it'));
        });

        it('should allow deletion if course is not assigned to any employee', async () => {
            sinon.stub(projectsMasterRepository, 'findEmployeesassignedtoProject').resolves([]);
            const req = {
                params: [{ ID: 'PR-567' }],
                reject: sinon.stub()
            };

            await service.checkEmployeesAssigned(req);

            expect(req.reject.called).to.be.false;
        });

    });

});