class User {
    constructor(id, name, email, password, is_admin = false) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.is_admin = is_admin;
    }
}

module.exports = User;