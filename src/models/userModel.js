import { v4 as uuidv4 } from 'uuid';

export default class User {
    constructor(login, password, age, isDeleted = false) {
        this.id = uuidv4();
        this.login = login;
        this.password = password;
        this.age = Number(age);
        this.isDeleted = isDeleted === 'true';
    }

    update(login, password, age, isDeleted) {
        if (login !== undefined) {
            this.login = login;
        }
        if (password !== undefined) {
            this.password = password;
        }
        if (age !== undefined) {
            this.age = Number(age);
        }
        if (isDeleted !== undefined) {
            this.isDeleted = isDeleted === 'true';
        }
    }
}
