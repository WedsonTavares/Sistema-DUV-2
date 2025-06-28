const express = require('express');
const cors = require('cors');
require('dotenv').config();

const database = require('./config/database');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

/**
 * Middleware de configuração
 */
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

/**
 * Middleware de logging em desenvolvimento
 */
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

/**
 * Inicialização do banco de dados
 */
database.connect();

/**
 * Registro das rotas
 */
app.use(routes);

/**
 * Rota de health check
 */
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Seals DUV API',
    version: '1.0.0'
  });
});

/**
 * Middleware de tratamento de rotas não encontradas
 */
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada',
    path: req.originalUrl
  });
});

/**
 * Middleware de tratamento de erros globais
 */
app.use((error, req, res, next) => {
  console.error('Erro interno do servidor:', error);
  
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    ...(process.env.NODE_ENV !== 'production' && { error: error.message })
  });
});

/**
 * Inicialização do servidor
 */
app.listen(PORT, () => {
  console.log(`🚢 Servidor DUV rodando na porta ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
