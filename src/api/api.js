import UserController from './userController';
import UserRepository from '../data-access/repositories/userRepository';
import UserModel from '../models/userModel';
import UserMapper from '../data-access/mappers/userMapper';
import GroupRepository from '../data-access/repositories/groupRepository';
import GroupModel from '../models/groupModel';
import GroupMapper from '../data-access/mappers/groupMapper';
import GroupController from './groupController';
import { validateUserMiddleware } from './middlewares/userMiddleware';
import { validateGroupMiddleware, validateUsersIds } from './middlewares/groupMiddleware';
import UserService from '../services/userService';
import GroupService from '../services/groupService';
import checkAuthMiddleware from './middlewares/checkAuthMiddleware';
import AuthController from './AuthController';
import AuthService from '../services/AuthService';
import corsMiddleware from './middlewares/corsMiddleware';

const userController = new UserController(new UserService(new UserRepository(UserModel, UserMapper)));
const groupController = new GroupController(new GroupService(new GroupRepository(GroupModel, GroupMapper, UserModel)));
const authController = new AuthController(new AuthService());

const routes = (app) => {
    app.use(corsMiddleware);
    app.route('/users')
        .get(checkAuthMiddleware, userController.getUsers)
        .post(checkAuthMiddleware, validateUserMiddleware, userController.addNewUser);

    app.route('/users/:id')
        .get(checkAuthMiddleware, userController.getUserByID)
        .put(checkAuthMiddleware, validateUserMiddleware, userController.updateUser)
        .delete(checkAuthMiddleware, userController.deleteUser);

    app.route('/groups')
        .get(checkAuthMiddleware, groupController.getGroups)
        .post(checkAuthMiddleware, validateGroupMiddleware, groupController.addNewGroup);

    app.route('/groups/:id')
        .get(checkAuthMiddleware, groupController.getGroupByID)
        .put(checkAuthMiddleware, validateGroupMiddleware, groupController.updateGroup)
        .delete(checkAuthMiddleware, groupController.deleteGroup);

    app.route('/groups/:id/add-users')
        .post(checkAuthMiddleware, validateUsersIds, groupController.addUsersToGroup);

    app.route('/login')
        .post(authController.auth);
};

export default routes;
