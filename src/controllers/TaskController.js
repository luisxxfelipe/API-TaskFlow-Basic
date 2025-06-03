const TaskService = require('../services/TaskService');

class TaskController {
    async getAllTasks(req, res) {
        try {
            const user_id = req.user?.id;
            const tasks = await TaskService.getAllTasks(user_id);
            res.status(200).json(tasks);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async createTask(req, res) {
        try {
            const { title, description } = req.body;
            const user_id = req.user?.id || null;
            const newTask = await TaskService.createTask(title, description, user_id);
            res.status(201).json(newTask);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async deleteTask(req, res) {
        try {
            const { id } = req.params;
            await TaskService.deleteTask(id);
            res.status(204).send();
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async updateTask(req, res) {
        try {
            const { id } = req.params;
            const { title, description } = req.body;
            await TaskService.updateTask(id, title, description);
            res.status(200).json({ message: 'Task atualizada com sucesso' });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

module.exports = new TaskController(); 