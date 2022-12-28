import User  from "../models/userModel";

let users = [];

function getAutoSuggestUsers(loginSubstring = '', limit = 10) {
    return users.filter(obj => obj.login.includes(loginSubstring)).slice(0, limit);
}

export const addNewUser = (req, res) => {
    let newUser = new User(req.body.login, req.body.password, req.body.age, req.body.isDeleted);

    users.push(newUser);
    res.send(newUser)
};

export const getUsers = (req, res) => {
    const users = getAutoSuggestUsers(req.query.login, req.query.limit);
    if (users.length === 0) {
        res.status(404).send();
    }
    res.send(users);
};

export const getUserByID = (req, res) => {
    users.forEach((user, key) => {
        if (user.id === parseInt(req.params.id)) {
            res.send(user)
        }
    })

    res.status(404).send('Not found');
};

export const updateUser = (req, res) => {
    users.forEach((user, key) => {
        if (user.id === parseInt(req.params.id)) {
            user.update(req.body.login, req.body.password, req.body.age, req.body.isDeleted);
            res.send(user)
        }
    });

    res.status(404).send('Not found');
};

export const deleteUser = (req, res) => {
    users.forEach((user, key) => {
        if (user.id === parseInt(req.params.id)) {
            user.isDeleted = true;
            res.send(user)
        }
    });

    res.status(404).send('Not found');
};
