const User = require('../models/User');

class UserRepository{
    constructor(){
        this.users = [];
        this.nextId = 1;
    }

    getAllUsers(){
        return this.users;
    }

    createUser(name, email){
        const newUser = new User(this.nextId++, name, email);
        this.users.push(newUser);
        return newUser;
    }
}

module.exports = new UserRepository();