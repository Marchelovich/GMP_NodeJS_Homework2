import UserController from '../../src/api/userController';
import UserService from '../../src/services/userService';
import { mockRequest, mockResponse } from 'jest-mock-req-res';
import UserRepository from '../../src/data-access/repositories/userRepository';

let req: any;
let res: any;
let next: any;

jest.mock('../../src/data-access/repositories/userRepository');
const userService = new UserService(new UserRepository());
const userController = new UserController(userService);

const users = [
    {
        id: 1,
        login: 'login1',
        password: 'password1',
        age: '99',
        isDeleted: false
    },
    {
        id: 2,
        login: 'login2',
        password: 'password2',
        age: '33',
        isDeleted: true
    }
];

describe('UserController.getUsers', () => {
    beforeEach(() => {
        req = mockRequest();
        res = mockResponse();
        next = jest.fn();
    });

    it('should return a list of users', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(UserService.prototype, 'getUsers').mockImplementation(() => users);
        req.query.login = 'login1';
        req.query.limit = 10;
        await userController.getUsers(req, res, next);

        expect(res.send).toHaveBeenCalledWith(users);
        expect(mockFn).toHaveBeenCalledWith('login1', 10);

        mockFn.mockRestore();
    });

    it('should return an empty list of users', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(UserService.prototype, 'getUsers').mockImplementation(() => []);
        await userController.getUsers(req, res, next);

        expect(res.send).toHaveBeenCalledWith([]);

        mockFn.mockRestore();
    });

    it('should catch an error', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(UserService.prototype, 'getUsers').mockImplementation(() => {
            throw new Error();
        });
        await userController.getUsers(req, res, next);
        next.mockImplementationOnce((err: any) => {
            expect(err).toBe(Error);
        });

        mockFn.mockRestore();
    });
});

describe('UserController.addNewUser', () => {
    const user = {
        login: 'login1',
        password: 'password1',
        age: '99',
        isDeleted: false
    };

    beforeEach(() => {
        req = mockRequest();
        req.body = user;
        res = mockResponse();
        next = jest.fn();
    });

    it('should return user entity', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(UserService.prototype, 'create').mockImplementation((entity: any) => entity);
        await userController.addNewUser(req, res, next);

        expect(mockFn).toHaveBeenCalledWith(user);
        expect(res.send).toHaveBeenCalledWith(user);

        mockFn.mockRestore();
    });

    it('should catch an error', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(UserService.prototype, 'create').mockImplementation(() => {
            throw new Error();
        });
        await userController.addNewUser(req, res, next);
        next.mockImplementationOnce((err: any) => {
            expect(err).toBe(Error);
        });

        mockFn.mockRestore();
    });
});

describe('UserController.getUserByID', () => {
    beforeEach(() => {
        req = mockRequest();
        req.params.id = users[0].id;
        res = mockResponse();
        next = jest.fn();
    });

    it('should return user entity', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(UserService.prototype, 'getByID').mockImplementation(() => users[0]);
        await userController.getUserByID(req, res, next);

        expect(mockFn).toHaveBeenCalledWith(users[0].id);
        expect(res.send).toHaveBeenCalledWith(users[0]);

        mockFn.mockRestore();
    });

    it('should return 404', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(UserService.prototype, 'getByID').mockImplementation(() => null);
        await userController.getUserByID(req, res, next);

        expect(mockFn).toHaveBeenCalledWith(users[0].id);
        expect(res.send).toHaveBeenCalledWith('Not found');
        expect(res.status).toHaveBeenCalledWith(404);

        mockFn.mockRestore();
    });

    it('should catch an error', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(UserService.prototype, 'getByID').mockImplementation(() => {
            throw new Error();
        });
        await userController.getUserByID(req, res, next);
        expect(mockFn).toHaveBeenCalledWith(users[0].id);
        next.mockImplementationOnce((err: any) => {
            expect(err).toBe(Error);
        });

        mockFn.mockRestore();
    });
});

describe('UserController.updateUser', () => {
    const user = {
        login: 'login1',
        password: 'password1',
        age: '99',
        isDeleted: false
    };

    beforeEach(() => {
        req = mockRequest();
        req.params.id = 1;
        req.body = user;
        res = mockResponse();
        next = jest.fn();
    });

    it('should return user entity', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(UserService.prototype, 'update').mockImplementation(() => user);
        await userController.updateUser(req, res, next);

        expect(mockFn).toHaveBeenCalledWith(1, user);
        expect(res.send).toHaveBeenCalledWith(user);

        mockFn.mockRestore();
    });

    it('should return 404', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(UserService.prototype, 'update').mockImplementation(() => null);
        await userController.updateUser(req, res, next);

        expect(mockFn).toHaveBeenCalledWith(1, user);
        expect(res.send).toHaveBeenCalledWith('Not found');
        expect(res.status).toHaveBeenCalledWith(404);

        mockFn.mockRestore();
    });

    it('should catch an error', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(UserService.prototype, 'update').mockImplementation(() => {
            throw new Error();
        });
        await userController.updateUser(req, res, next);
        expect(mockFn).toHaveBeenCalledWith(1, user);
        next.mockImplementationOnce((err: any) => {
            expect(err).toBe(Error);
        });

        mockFn.mockRestore();
    });
});

describe('UserController.deleteUser', () => {
    beforeEach(() => {
        req = mockRequest();
        req.params.id = 1;
        res = mockResponse();
        next = jest.fn();
    });

    it('should delete and return user entity', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(UserService.prototype, 'delete').mockImplementation(() => users[0]);
        await userController.deleteUser(req, res, next);

        expect(mockFn).toHaveBeenCalledWith(1);
        expect(res.send).toHaveBeenCalledWith(users[0]);
        expect(res.status).toHaveBeenCalledWith(203);

        mockFn.mockRestore();
    });

    it('should return 404', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(UserService.prototype, 'delete').mockImplementation(() => null);
        await userController.deleteUser(req, res, next);

        expect(mockFn).toHaveBeenCalledWith(1);
        expect(res.send).toHaveBeenCalledWith('Not found');
        expect(res.status).toHaveBeenCalledWith(404);

        mockFn.mockRestore();
    });

    it('should catch an error', async () => {
        // @ts-ignore
        const mockFn = jest.spyOn(UserService.prototype, 'delete').mockImplementation(() => {
            throw new Error();
        });
        await userController.deleteUser(req, res, next);
        expect(mockFn).toHaveBeenCalledWith(1);
        next.mockImplementationOnce((err: any) => {
            expect(err).toBe(Error);
        });

        mockFn.mockRestore();
    });
});
