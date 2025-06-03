const TaskRepository = require('../repositories/TaskRepository');

class TaskService {
    async getAllTasks(user_id) {
        return await TaskRepository.getAllTasks(user_id);
    }

    async createTask(title, description, user_id) {
        if (!title || !description) {
            throw new Error('Título e descrição são obrigatórios');
        }
        return await TaskRepository.createTask(title, description, user_id);
    }

    async deleteTask(id) {
        return await TaskRepository.deleteTask(id);
    }

    async updateTask(id, title, description) {
        if (!title || !description) {
            throw new Error('Título e descrição são obrigatórios');
        }
        return await TaskRepository.updateTask(id, title, description);
    }
}

module.exports = new TaskService(); 