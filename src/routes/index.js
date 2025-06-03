const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const taskRoutes = require('./task.routes');

router.get('/', (req, res) => {
    res.send('Taskflow rodando...');
});

router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);

module.exports = router;