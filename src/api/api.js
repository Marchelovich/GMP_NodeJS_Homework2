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

const userController = new UserController(new UserRepository(UserModel, UserMapper));
const groupController = new GroupController(new GroupRepository(GroupModel, GroupMapper, UserModel));


const routes = (app) => {
    app.route('/users')
        .get(userController.getUsers)
        .post(validateUserMiddleware, userController.addNewUser);

    app.route('/users/:id')
        .get(userController.getUserByID)
        .put(validateUserMiddleware, userController.updateUser)
        .delete(userController.deleteUser);

    app.route('/groups')
        .get(groupController.getGroups)
        .post(validateGroupMiddleware, groupController.addNewGroup);

    app.route('/groups/:id')
        .get(groupController.getGroupByID)
        .put(validateGroupMiddleware, groupController.updateGroup)
        .delete(groupController.deleteGroup);

    app.route('/groups/:id/add-users')
        .post(validateUsersIds, groupController.addUsersToGroup);
};

export default routes;
