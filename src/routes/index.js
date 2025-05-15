const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');

router.get('/', (req, res) => {
    res.send('Taskflow rodando...');
});

router.use('/users', userRoutes);

module.exports = router;