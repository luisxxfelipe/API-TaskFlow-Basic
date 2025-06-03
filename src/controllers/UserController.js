const UserService = require('../services/UserService');
const jwt = require('jsonwebtoken');

class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async createUser(req, res) {
        try {
            const { name, email, password, is_admin } = req.body;
            const newUser = await UserService.createUser(name, email, password, is_admin);
            res.status(201).json({ id: newUser.id, name: newUser.name, email: newUser.email, is_admin: newUser.is_admin });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserService.authenticate(email, password);
            const token = jwt.sign(
                { id: user.id, name: user.name, email: user.email, is_admin: user.is_admin },
                process.env.JWT_SECRET || 'segredo',
                { expiresIn: '1d' }
            );
            res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email, is_admin: user.is_admin } });
        } catch (err) {
            res.status(401).json({ message: err.message });
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, email } = req.body;
            const updatedUser = await UserService.updateUser(id, name, email);
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            await UserService.deleteUser(id);
            res.status(204).send();
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

module.exports = new UserController();