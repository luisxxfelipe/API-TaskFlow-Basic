const db = require('../config/db');
const Task = require('../models/Task');

class TaskRepository {
    async getAllTasks(user_id) {
        const [rows] = await db.query('SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC', [user_id]);
        return rows.map(row => new Task(row.id, row.title, row.description, row.user_id, row.created_at));
    }

    async createTask(title, description, user_id) {
        const [result] = await db.query(
            'INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)',
            [title, description, user_id]
        );
        return new Task(result.insertId, title, description, user_id, new Date());
    }

    async deleteTask(id) {
        await db.query('DELETE FROM tasks WHERE id = ?', [id]);
        return true;
    }

    async updateTask(id, title, description) {
        await db.query('UPDATE tasks SET title = ?, description = ? WHERE id = ?', [title, description, id]);
        return true;
    }
}

module.exports = new TaskRepository(); 