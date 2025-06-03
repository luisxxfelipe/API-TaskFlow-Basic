const db = require('../config/db');
const User = require('../models/User');

class UserRepository {
    async getAllUsers() {
        const [rows] = await db.query('SELECT id, name, email, is_admin FROM users');
        return rows.map(row => new User(row.id, row.name, row.email, undefined, !!row.is_admin));
    }

    async createUser(name, email, password, is_admin = false) {
        const [result] = await db.query(
            'INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, ?)',
            [name, email, password, is_admin]
        );
        return new User(result.insertId, name, email, undefined, is_admin);
    }

    async updateUser(id, name, email) {
        await db.query(
            'UPDATE users SET name = ?, email = ? WHERE id = ?',
            [name, email, id]
        );
        return new User(id, name, email);
    }

    async deleteUser(id) {
        await db.query('DELETE FROM users WHERE id = ?', [id]);
        return true;
    }

    async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) return null;
        const user = rows[0];
        return new User(user.id, user.name, user.email, user.password, !!user.is_admin);
    }
}

module.exports = new UserRepository();