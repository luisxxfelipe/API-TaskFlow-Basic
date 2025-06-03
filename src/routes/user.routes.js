const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/auth');

router.post('/register', (req, res) => UserController.createUser(req, res));
router.post('/login', (req, res) => UserController.login(req, res));

router.get('/', authMiddleware, (req, res) => UserController.getAllUsers(req, res));
router.post('/', authMiddleware, (req, res) => UserController.createUser(req, res));
router.put('/:id', authMiddleware, (req, res) => UserController.updateUser(req, res));
router.delete('/:id', authMiddleware, (req, res) => UserController.deleteUser(req, res));

module.exports = router;