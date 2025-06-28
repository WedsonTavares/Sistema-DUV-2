const sqlite3 = require('sqlite3').verbose();
const path = require('path');

/**
 * Configuração e inicialização do banco de dados SQLite
 * Implementa o padrão Singleton para garantir uma única instância
 */
class DatabaseConfig {
  constructor() {
    this.db = null;
    this.dbPath = path.join(__dirname, '../../database', 'sistema-duvs.sqlite');
  }

  /**
   * Conecta ao banco de dados e cria as tabelas se necessário
   * @returns {Promise<sqlite3.Database>} Instância do banco de dados
   */
  async connect() {
    if (this.db) {
      return this.db;
    }

    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(this.dbPath, (err) => {
        if (err) {
          console.error('Erro ao conectar com o banco de dados:', err);
          reject(err);
        } else {
          console.log('✅ Conectado ao banco SQLite');
          this.initializeTables()
            .then(() => resolve(this.db))
            .catch(reject);
        }
      });
    });
  }

  /**
   * Inicializa as tabelas do banco de dados
   * Ordem de criação respeitando foreign keys
   */
  async initializeTables() {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        // Tabela de Navios
        this.db.run(`
          CREATE TABLE IF NOT EXISTS navios (
            id TEXT PRIMARY KEY,
            nome TEXT NOT NULL,
            bandeira TEXT NOT NULL,
            imagem TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);

        // Tabela de Pessoas
        this.db.run(`
          CREATE TABLE IF NOT EXISTS pessoas (
            id TEXT PRIMARY KEY,
            nome TEXT NOT NULL,
            tipo TEXT NOT NULL CHECK (tipo IN ('passageiro', 'tripulante')),
            nacionalidade TEXT NOT NULL,
            sid TEXT,
            foto TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `);

        // Tabela de DUVs
        this.db.run(`
          CREATE TABLE IF NOT EXISTS duvs (
            id TEXT PRIMARY KEY,
            numero TEXT UNIQUE NOT NULL,
            data_viagem DATE NOT NULL,
            navio_id TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (navio_id) REFERENCES navios (id)
          )
        `);

        // Tabela de relacionamento DUV-Pessoas
        this.db.run(`
          CREATE TABLE IF NOT EXISTS duv_pessoas (
            duv_id TEXT,
            pessoa_id TEXT,
            embarque_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (duv_id, pessoa_id),
            FOREIGN KEY (duv_id) REFERENCES duvs (id) ON DELETE CASCADE,
            FOREIGN KEY (pessoa_id) REFERENCES pessoas (id) ON DELETE CASCADE
          )
        `, (err) => {
          if (err) {
            console.error('Erro ao criar tabelas:', err);
            reject(err);
          } else {
            console.log('✅ Tabelas do banco inicializadas');
            resolve();
          }
        });
      });
    });
  }

  /**
   * Retorna a instância do banco de dados
   * @returns {sqlite3.Database}
   */
  getInstance() {
    if (!this.db) {
      throw new Error('Banco de dados não foi inicializado. Chame connect() primeiro.');
    }
    return this.db;
  }

  /**
   * Fecha a conexão com o banco de dados
   */
  close() {
    if (this.db) {
      this.db.close((err) => {
        if (err) {
          console.error('Erro ao fechar banco:', err);
        } else {
          console.log('✅ Conexão com banco fechada');
          this.db = null;
        }
      });
    }
  }
}

// Exporta instância singleton
module.exports = new DatabaseConfig();
