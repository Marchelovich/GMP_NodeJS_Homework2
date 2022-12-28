export default class User {
    constructor(login, password, age, isDeleted = false) {
            this.id = User.idGenerator.next().value;
            this.login = login;
            this.password = password;
            this.age = Number(age);
            this.isDeleted = isDeleted === "true";
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
            this.isDeleted = isDeleted === "true";
        }
    }

    static idGenerator = (function* () {
        let i = 0;
        while (true) {
            i = i + 1;
            yield i;
        }
    })();

}
