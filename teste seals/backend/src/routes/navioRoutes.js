const express = require('express');
const NavioController = require('../controllers/NavioController');
const databaseConfig = require('../config/database');

const router = express.Router();

// Inicializa o controlador com a instância do banco
const initController = async () => {
  const db = await databaseConfig.connect();
  return new NavioController(db);
};

// Middleware para garantir que o controlador está inicializado
const withController = async (req, res, next) => {
  if (!router.navioController) {
    router.navioController = await initController();
  }
  next();
};

// Rotas para Navios
router.get('/', withController, (req, res) => router.navioController.index(req, res));
router.get('/:id', withController, (req, res) => router.navioController.show(req, res));
router.post('/', withController, (req, res) => router.navioController.store(req, res));
router.put('/:id', withController, (req, res) => router.navioController.update(req, res));
router.delete('/:id', withController, (req, res) => router.navioController.destroy(req, res));

module.exports = router;
