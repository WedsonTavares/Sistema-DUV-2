const express = require('express');
const PessoaController = require('../controllers/PessoaController');
const databaseConfig = require('../config/database');

const router = express.Router();

// Inicializa o controlador com a instância do banco
const initController = async () => {
  const db = await databaseConfig.connect();
  return new PessoaController(db);
};

// Middleware para garantir que o controlador está inicializado
const withController = async (req, res, next) => {
  if (!router.pessoaController) {
    router.pessoaController = await initController();
  }
  next();
};

// Rotas para Pessoas
router.get('/', withController, (req, res) => router.pessoaController.index(req, res));
router.get('/:id', withController, (req, res) => router.pessoaController.show(req, res));
router.post('/', withController, (req, res) => router.pessoaController.store(req, res));
router.put('/:id', withController, (req, res) => router.pessoaController.update(req, res));
router.delete('/:id', withController, (req, res) => router.pessoaController.destroy(req, res));

module.exports = router;
