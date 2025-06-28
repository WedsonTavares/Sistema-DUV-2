const { v4: uuidv4 } = require('uuid');

/**
 * Model base com funcionalidades comuns
 * Implementa padrão Active Record simplificado
 */
class BaseModel {
  constructor(db) {
    this.db = db;
    this.tableName = '';
  }

  /**
   * Executa uma query e retorna uma Promise
   * @param {string} sql - Query SQL
   * @param {Array} params - Parâmetros da query
   * @param {string} method - Método do SQLite (run, get, all)
   * @returns {Promise}
   */
  executeQuery(sql, params = [], method = 'all') {
    return new Promise((resolve, reject) => {
      this.db[method](sql, params, function(err, result) {
        if (err) {
          console.error(`Erro na query: ${sql}`, err);
          reject(err);
        } else {
          resolve(method === 'run' ? { id: this.lastID, changes: this.changes } : result);
        }
      });
    });
  }

  /**
   * Busca todos os registros
   * @returns {Promise<Array>}
   */
  async findAll() {
    const sql = `SELECT * FROM ${this.tableName} ORDER BY created_at DESC`;
    return this.executeQuery(sql);
  }

  /**
   * Busca um registro por ID
   * @param {string} id - ID do registro
   * @returns {Promise<Object|null>}
   */
  async findById(id) {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    return this.executeQuery(sql, [id], 'get');
  }

  /**
   * Cria um novo registro
   * @param {Object} data - Dados do registro
   * @returns {Promise<Object>}
   */
  async create(data) {
    const id = uuidv4();
    const dataWithId = { id, ...data };
    
    const columns = Object.keys(dataWithId).join(', ');
    const placeholders = Object.keys(dataWithId).map(() => '?').join(', ');
    const values = Object.values(dataWithId);
    
    const sql = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`;
    
    await this.executeQuery(sql, values, 'run');
    return this.findById(id);
  }

  /**
   * Atualiza um registro por ID
   * @param {string} id - ID do registro
   * @param {Object} data - Dados para atualização
   * @returns {Promise<Object>}
   */
  async update(id, data) {
    const dataWithTimestamp = { ...data, updated_at: new Date().toISOString() };
    
    const setClause = Object.keys(dataWithTimestamp)
      .map(key => `${key} = ?`)
      .join(', ');
    const values = [...Object.values(dataWithTimestamp), id];
    
    const sql = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`;
    
    await this.executeQuery(sql, values, 'run');
    return this.findById(id);
  }

  /**
   * Deleta um registro por ID
   * @param {string} id - ID do registro
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
    const result = await this.executeQuery(sql, [id], 'run');
    return result.changes > 0;
  }
}

module.exports = BaseModel;
