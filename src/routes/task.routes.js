const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res) => TaskController.getAllTasks(req, res));
router.post('/', auth, (req, res) => TaskController.createTask(req, res));
router.put('/:id', auth, (req, res) => TaskController.updateTask(req, res));
router.delete('/:id', auth, (req, res) => TaskController.deleteTask(req, res));

module.exports = router; 