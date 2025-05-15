const UserRepository = require('../repositories/UserRepository');

class UserService{
    getAllUsers(){
        return UserRepository.getAllUsers();
    }

    createUser(name, email){
        
        if(!name || !email){
            throw new Error('Nome e email são obrigatórios');
        }

        if(!email.includes('@')){
            throw new Error('Email inválido');
        }

        return UserRepository.createUser(name, email);
    }
}

module.exports = new UserService();