const UserService = require('../services/UserService');

class UserController{
    getAllUsers(req, res){
        try{
            const users = UserService.getAllUsers();
            res.status(200).json(users);
        }catch(err){
            res.status(500).json({message: err.message});
        }
    }

    createUser(req, res){
        try{
            const { name, email } = req.body;
            const newUser = UserService.createUser(name, email);
            res.status(201).json(newUser);
        }catch(err){
            res.status(400).json({message: err.message});
        }
    }
}

module.exports = new UserController();