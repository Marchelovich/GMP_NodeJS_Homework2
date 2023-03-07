import { mockRequest, mockResponse } from 'jest-mock-req-res';
import GroupService from '../../src/services/groupService';
import GroupController from '../../src/api/groupController';

let req: any;
let res: any;
let next: any;

jest.mock('../../src/services/groupService');
const groupController = new GroupController(new GroupService());

describe('GroupController.getAll', () => {
    const groups = [
        {
            id: 1,
            name: 'group1',
            permissions: ['permission1']
        },
        {
            id: 2,
            name: 'group2',
            permissions: ['permission2']
        }
    ];
    beforeEach(() => {
        req = mockRequest();
        res = mockResponse();
        next = jest.fn();
    });

    it('should return a list of groups', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(GroupService.prototype, 'getAll').mockImplementation(() => groups);
        await groupController.getGroups(req, res, next);

        expect(res.send).toHaveBeenCalledWith(groups);
        expect(mockFn).toHaveBeenCalled();

        mockFn.mockRestore();
    });

    it('should catch an error', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(GroupService.prototype, 'getAll').mockImplementation(() => {
            throw new Error();
        });
        await groupController.getGroups(req, res, next);

        next.mockImplementationOnce((err: any) => {
            expect(err).toBe(Error);
        });

        mockFn.mockRestore();
    });
});

describe('GroupController.addBewGroup', () => {
    const group = {
        name: 'group1',
        permissions: ['permission1']
    };
    beforeEach(() => {
        req = mockRequest();
        req.body = group;
        res = mockResponse();
        next = jest.fn();
    });

    it('should create a group entity', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(GroupService.prototype, 'create').mockImplementation((entity) => entity);
        await groupController.addNewGroup(req, res, next);

        expect(res.send).toHaveBeenCalledWith(group);
        expect(mockFn).toHaveBeenCalledWith(group);

        mockFn.mockRestore();
    });

    it('should catch an error', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(GroupService.prototype, 'create').mockImplementation(() => {
            throw new Error();
        });
        await groupController.addNewGroup(req, res, next);

        next.mockImplementationOnce((err: any) => {
            expect(err).toBe(Error);
        });
        expect(mockFn).toHaveBeenCalledWith(group);

        mockFn.mockRestore();
    });
});

describe('GroupController.getGroupByID', () => {
    const group = {
        id: 1,
        name: 'group1',
        permissions: ['permission1']
    };

    beforeEach(() => {
        req = mockRequest();
        req.params.id = 1;
        res = mockResponse();
        next = jest.fn();
    });

    it('should return a group entity', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(GroupService.prototype, 'getByID').mockImplementation(() => group);
        await groupController.getGroupByID(req, res, next);

        expect(res.send).toHaveBeenCalledWith(group);
        expect(mockFn).toHaveBeenCalledWith(1);

        mockFn.mockRestore();
    });

    it('should return 404', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(GroupService.prototype, 'getByID').mockImplementation(() => null);
        await groupController.getGroupByID(req, res, next);

        expect(res.send).toHaveBeenCalledWith('Not found');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(mockFn).toHaveBeenCalledWith(1);

        mockFn.mockRestore();
    });

    it('should catch an error', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(GroupService.prototype, 'getByID').mockImplementation(() => {
            throw new Error();
        });
        await groupController.getGroupByID(req, res, next);

        next.mockImplementationOnce((err: any) => {
            expect(err).toBe(Error);
        });
        expect(mockFn).toHaveBeenCalledWith(1);

        mockFn.mockRestore();
    });
});

describe('GroupController.updateGroup', () => {
    const group = {
        name: 'group1',
        permissions: ['permission1']
    };

    beforeEach(() => {
        req = mockRequest();
        req.params.id = 1;
        req.body = group;
        res = mockResponse();
        next = jest.fn();
    });

    it('should update and return an entity', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(GroupService.prototype, 'update').mockImplementation(() => group);
        await groupController.updateGroup(req, res, next);

        expect(mockFn).toHaveBeenCalledWith(1, group);
        expect(res.send).toHaveBeenCalledWith(group);

        mockFn.mockRestore();
    });

    it('should return 404', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(GroupService.prototype, 'update').mockImplementation(() => null);
        await groupController.updateGroup(req, res, next);

        expect(mockFn).toHaveBeenCalledWith(1, group);
        expect(res.send).toHaveBeenCalledWith('Not found');
        expect(res.status).toHaveBeenCalledWith(404);

        mockFn.mockRestore();
    });

    it('should catch an error', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(GroupService.prototype, 'update').mockImplementation(() => {
            throw new Error();
        });
        await groupController.updateGroup(req, res, next);

        next.mockImplementationOnce((err: any) => {
            expect(err).toBe(Error);
        });
        expect(mockFn).toHaveBeenCalledWith(1, group);


        mockFn.mockRestore();
    });
});

describe('GroupController.deleteGroup', () => {
    const group = {
        name: 'group1',
        permissions: ['permission1']
    };

    beforeEach(() => {
        req = mockRequest();
        req.params.id = 1;
        res = mockResponse();
        next = jest.fn();
    });

    it('should delete and return group entity', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(GroupService.prototype, 'delete').mockImplementation(() => group);
        await groupController.deleteGroup(req, res, next);

        expect(mockFn).toHaveBeenCalledWith(1);
        expect(res.send).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(203);

        mockFn.mockRestore();
    });

    it('should return 404', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(GroupService.prototype, 'delete').mockImplementation(() => null);
        await groupController.deleteGroup(req, res, next);

        expect(mockFn).toHaveBeenCalledWith(1);
        expect(res.send).toHaveBeenCalledWith('Not found');
        expect(res.status).toHaveBeenCalledWith(404);

        mockFn.mockRestore();
    });

    it('should catch an error', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(GroupService.prototype, 'delete').mockImplementation(() => {
            throw new Error();
        });
        await groupController.deleteGroup(req, res, next);
        expect(mockFn).toHaveBeenCalledWith(1);
        next.mockImplementationOnce((err: any) => {
            expect(err).toBe(Error);
        });

        mockFn.mockRestore();
    });
});

describe('GroupController.addUsersToGroup', () => {
    beforeEach(() => {
        req = mockRequest();
        req.body.usersIds = [1, 2];
        req.params.id = 1;
        res = mockResponse();
        next = jest.fn();
    });

    it('should add user to groups', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(GroupService.prototype, 'addUsersToGroup').mockImplementation(() => 1);
        await groupController.addUsersToGroup(req, res, next);

        expect(mockFn).toHaveBeenCalledWith(1, [1, 2]);
        expect(res.send).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);

        mockFn.mockRestore();
    });

    it('user in already in the groups', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(GroupService.prototype, 'addUsersToGroup').mockImplementation(() => undefined);
        await groupController.addUsersToGroup(req, res, next);

        expect(mockFn).toHaveBeenCalledWith(1, [1, 2]);
        expect(res.send).toHaveBeenCalledWith('Records are already exist');
        expect(res.status).toHaveBeenCalledWith(200);

        mockFn.mockRestore();
    });

    it('should handle an unexpected result', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(GroupService.prototype, 'addUsersToGroup').mockImplementation(() => 0);
        await groupController.addUsersToGroup(req, res, next);

        expect(mockFn).toHaveBeenCalledWith(1, [1, 2]);
        next.mockImplementationOnce((err: any) => {
            expect(err).toBe(Error);
        });

        mockFn.mockRestore();
    });

    it('should handle an error', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(GroupService.prototype, 'addUsersToGroup').mockImplementation(() => {
            throw new Error();
        });
        await groupController.addUsersToGroup(req, res, next);

        expect(mockFn).toHaveBeenCalledWith(1, [1, 2]);
        next.mockImplementationOnce((err: any) => {
            expect(err).toBe(Error);
        });

        mockFn.mockRestore();
    });
});
