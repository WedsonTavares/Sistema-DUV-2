const express = require('express');
const DuvController = require('../controllers/DuvController');
const databaseConfig = require('../config/database');

const router = express.Router();

// Inicializa o controlador com a instância do banco
const initController = async () => {
  const db = await databaseConfig.connect();
  return new DuvController(db);
};

// Middleware para garantir que o controlador está inicializado
const withController = async (req, res, next) => {
  if (!router.duvController) {
    router.duvController = await initController();
  }
  next();
};

// Rotas para DUVs
router.get('/', withController, (req, res) => router.duvController.index(req, res));
router.get('/:id', withController, (req, res) => router.duvController.show(req, res));
router.post('/', withController, (req, res) => router.duvController.store(req, res));
router.put('/:id', withController, (req, res) => router.duvController.update(req, res));
router.delete('/:id', withController, (req, res) => router.duvController.destroy(req, res));

module.exports = router;
