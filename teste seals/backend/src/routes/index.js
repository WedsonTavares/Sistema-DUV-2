const express = require('express');
const duvRoutes = require('./duvRoutes');
const navioRoutes = require('./navioRoutes');
const pessoaRoutes = require('./pessoaRoutes');

const router = express.Router();

// Registrar rotas
router.use('/api/duvs', duvRoutes);
router.use('/api/navios', navioRoutes);
router.use('/api/pessoas', pessoaRoutes);

module.exports = router;
