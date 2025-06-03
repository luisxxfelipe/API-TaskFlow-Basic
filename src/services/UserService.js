const UserRepository = require('../repositories/UserRepository');
const bcrypt = require('bcryptjs');

class UserService {
    async getAllUsers() {
        return await UserRepository.getAllUsers();
    }

    async createUser(name, email, password, is_admin = false) {
        if (!name || !email || !password) {
            throw new Error('Nome, email e senha são obrigatórios');
        }
        if (!email.includes('@')) {
            throw new Error('Email inválido');
        }
        const existing = await UserRepository.findByEmail(email);
        if (existing) {
            throw new Error('Email já cadastrado');
        }
        const hash = await bcrypt.hash(password, 10);
        return await UserRepository.createUser(name, email, hash, is_admin);
    }

    async updateUser(id, name, email) {
        if (!name || !email) {
            throw new Error('Nome e email são obrigatórios');
        }
        if (!email.includes('@')) {
            throw new Error('Email inválido');
        }
        return await UserRepository.updateUser(id, name, email);
    }

    async deleteUser(id) {
        return await UserRepository.deleteUser(id);
    }

    async authenticate(email, password) {
        const user = await UserRepository.findByEmail(email);
        if (!user) throw new Error('Usuário não encontrado');
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) throw new Error('Senha inválida');
        return user;
    }
}

module.exports = new UserService();