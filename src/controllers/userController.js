import User  from '../models/userModel';

const users = [];

function getAutoSuggestUsers(loginSubstring = '', limit = 10) {
    const sort = (a, b) => {
        return a.login > b.login ? 1 : -1;
    };
    const filtered = loginSubstring ? users.filter(obj => obj.login.includes(loginSubstring)) : users;

    return filtered.sort(sort).slice(0, limit);
}

export const addNewUser = (req, res) => {
    const newUser = new User(req.body.login, req.body.password, req.body.age, req.body.isDeleted);

    users.push(newUser);
    res.send(newUser);
};

export const getUsers = (req, res) => {
    res.send(getAutoSuggestUsers(req.query.login, req.query.limit));
};

export const getUserByID = (req, res) => {
    const user = users.find((el) => {
        if (el.id === req.params.id) {
            return true;
        }
    });

    if (user) {
        res.send(user);
    } else {
        res.status(404).send('Not found');
    }
};

export const updateUser = (req, res) => {
    const user = users.find((el) => {
        if (el.id === req.params.id) {
            return true;
        }
    });

    if (user) {
        user.update(req.body.login, req.body.password, req.body.age, req.body.isDeleted);
        res.send(user);
    } else {
        res.status(404).send('Not found');
    }
};

export const deleteUser = (req, res) => {
    const user = users.find((el) => {
        if (el.id === req.params.id) {
            return true;
        }
    });

    if (user) {
        user.isDeleted = true;
        res.send(user);
    } else {
        res.status(404).send('Not found');
    }
};
